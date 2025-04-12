import { wearherAppEl } from "../main";
import { fetchWeatherData } from "./api";
import { getConditionImagePath } from "./condition";
import { saveToLocalStorage } from "./localStorage";

import { renderMainMenu } from "./mainMenu";

import { formattemperature, sunnHour } from "./utils";

export async function handleCityData(cityId) {
  const weatherData = await fetchWeatherData(cityId);
  //TODU:5- city daten holen und verteilen
  console.log(weatherData);

  displayWeather(weatherData, cityId);
  gethours(weatherData);
  renderHours(weatherData);
  renderNextThreeDays(weatherData);
  daysAstroInfo(weatherData);
  conditionImage(weatherData);
}

//TODU:6 richtige wetter situation uberprüfen und passende bild für hintergrund hinzufugen
function conditionImage(data) {
  const containerEl = document.querySelector(".city-mainbox");

  const containerImage = getConditionImagePath(
    data.current.condition.code,
    data.current.is_day !== 1
  );

  if (containerImage) {
    containerEl.style.backgroundImage = `linear-gradient(0deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url(${containerImage})`;
  }
}

//TODU:7 -  alle city Wetter daten foront seite hinzüfugen

function displayWeather(weatherData, cityId) {
  wearherAppEl.innerHTML = `
    <div class="city-mainbox">
        <div class="city-buttons">
            <div class="city-buttons__return">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6">
                                                                                                                                                                                                                            
                  <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
            </div>

            <div class="city-buttons__favoriten">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6">
                    
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                </svg>
            </div>
        </div>


        <div class="create-city">
            <h2 class="create-city__title">${weatherData.location.name}</h2>
            <h1 class="create-city__temp" >${formattemperature(
              weatherData.current.temp_c
            )}°</h1>
            <p class="create-city__condition">${
              weatherData.current.condition.text
            }</p>
            <div class="create-city__temperature">
                <span>H:${
                  weatherData.forecast.forecastday[0].day.maxtemp_c
                }°</span>
                <span>T:${
                  weatherData.forecast.forecastday[0].day.mintemp_c
                }°</span>
            </div>
        </div>

        <div class="forecast-box">
          <div class="forecast-box__today">
            <p class="forecast-box__text">Heute ${
              weatherData.forecast.forecastday[0].day.condition.text
            }.</p>
            <p class="forecast-box__text">Wind bis zum ${
              weatherData.forecast.forecastday[0].day.maxwind_kph
            }km/h.</p>
          </div>
          <div class="forecast-box__time"></div>
        </div>

        <div class="forecast-weekday">
          <p class="forecast-weekday__text" >Vorhersage für die nächsten 3 Tage:</p>
        </div>

        <div class="forecast-dayInfo"></div>
    </div>      
    `;

  const returnBtnEl = wearherAppEl.querySelector(".city-buttons__return");
  const favoritenBtnEl = wearherAppEl.querySelector(".city-buttons__favoriten");

  returnBtnEl.addEventListener("click", returnMenu);
  favoritenBtnEl.addEventListener("click", () => {
    //Hier eine Überprüfung einfügen, ob die cityID schon im lokal Storage orhanden ist. Wenn ja, dann darf saveFavoriteCity nicht ausgeführt werden.
    favoritenBtnEl.remove();
    saveToLocalStorage(cityId, weatherData.location.name);
  });
}

//TODU:8- zurük zum haupmenu button Fn
function returnMenu() {
  renderMainMenu();
}

//TODU:9- zeit einstellin EU zeit zone
function gethours(weatherData) {
  const time = new Date(weatherData.location.localtime).getHours();
  return time;
}
//:10- 24 uhr zeit anzeige FN aber gits hier probleme
function renderHours(weatherData) {
  const hour = gethours(weatherData);

  let allHours = [];

  for (let i = 0; i < 3; i++) {
    let day = weatherData.forecast.forecastday[i];

    for (let x = 0; x < 24; x++) {
      allHours.push(day.hour[x]);
    }
  }

  for (let i = 0; i < 24; i++) {
    const index = (hour + i) % allHours.length;
    const hourdata = allHours[index];
    const icon = hourdata.condition.icon;
    const temp = hourdata.temp_c;
    const displayhour = (hour + i) % 24;

    let hourText;

    if (displayhour === hour) {
      hourText = "jetz";
    } else {
      hourText = String(displayhour).padStart(2, "0") + " Uhr";
    }

    const forecastEl = document.querySelector(".forecast-box__time");

    forecastEl.innerHTML += `
     <div class="hour-box">
      <p class="hour-box__hour">${hourText}</p>
        <img src="https:${icon}" alt="">
       <p class="hour-box__temp">${temp}°</p>
      </div>
    `;
  }
}

//TODU:11- nechste 3 tagige wetter info anzeige Fn
function renderNextThreeDays(weatherData) {
  for (let i = 0; i < 3; i++) {
    let day = weatherData.forecast.forecastday[i];
    let data = new Date(day.date);
    let dayData = data.toLocaleDateString("de-De", { weekday: "long" });
    let icon = day.day.condition.icon;
    let maxTemp = day.day.maxtemp_c;
    let mintemp = day.day.mintemp_c;
    let wind = day.day.maxwind_kph;

    if (i === 0) {
      dayData = "Heute";
    }

    const forecastWekdayEl = document.querySelector(".forecast-weekday");

    forecastWekdayEl.innerHTML += `
     <div class="weekday-box">
        <div class="weekday-box__info">
          <p>${dayData}</p>
          <img class="weekday-box__icon" src="https:${icon}" alt=""/>
          <p>H:${maxTemp}°</p>
          <p>T:${mintemp}°</p>
          <p>${wind} km/h</p>
        </div>
      </div>
    `;
  }
}

//TUDO:12- astro info anzeige Fn
function daysAstroInfo(weatherData) {
  const dayInfo = weatherData;
  const forecastDayEl = document.querySelector(".forecast-dayInfo");

  forecastDayEl.innerHTML += `
      <div class="weather-footer">
          <div class="weather-footer__left">
            <p class="weather-footer__left-text">Feuchtigkeit</p>
            <span class="weather-footer__left-info">${
              dayInfo.current.humidity
            }%</span>
          </div>
          <div class="weather-footer__right">
            <p class="weather-footer__right-text">Gefühlt</p>
            <span class="weather-footer__right-info">${
              dayInfo.current.feelslike_c
            }°</span>
          </div>
      </div>
      
      <div class="weather-footer">
          <div class="weather-footer__left">
            <p class="weather-footer__left-text">Sonnenaufgang</p>
            <span class="weather-footer__left-info">${sunnHour(
              dayInfo.forecast.forecastday[0].astro.sunrise
            )} Uhr</span>
          </div>
          <div class="weather-footer__right">
            <p class="weather-footer__right-text">Sonnenuntergang</p>
            <span class="weather-footer__right-info">${sunnHour(
              dayInfo.forecast.forecastday[0].astro.sunset
            )} Uhr</span>
          </div>
      </div>

      <div class="weather-footer">
          <div class="weather-footer__left">
            <p class="weather-footer__left-text">Niederschlag</p>
            <span class="weather-footer__left-info">${
              dayInfo.current.precip_mm
            }mm</span>
          </div>
          <div class="weather-footer__right">
            <p class="weather-footer__right-text">UV-Index</p>
            <span class="weather-footer__right-info">${
              dayInfo.current.uv
            }</span>
          </div>
      </div>
  `;
}
