import { fetchWeather } from "./api";
import { getConditionImagePath } from "./condition";
import { removeSpinner, renderSpinner } from "./spinner";
import { formattemperature, sunnHour } from "./utils";

const wearherAppEl = document.getElementById("app");

export async function getCityName(cityName) {
  renderSpinner(cityName);

  const weatherData = await fetchWeather(cityName);

  console.log(weatherData);
  removeSpinner();

  const cityWeatherData = renderWeather(weatherData);

  gethours(weatherData);

  renderWeather(weatherData);

  setTimeout(() => {
    renderHours(weatherData);
    renderNextThreeDays(weatherData);
    daysAstroInfo(weatherData);
    conditionImage(weatherData);
  }, 100);

  displayWeather(cityWeatherData);
}

function renderWeather(weatherData) {
  return {
    cityName: weatherData.location.name,
    temperature: weatherData.current.temp_c,
    condition: weatherData.current.condition.text,
    maxTemp: weatherData.forecast.forecastday[0].day.maxtemp_c,
    mintemp: weatherData.forecast.forecastday[0].day.mintemp_c,
    conditionDay: weatherData.forecast.forecastday[0].day.condition.text,
    maxWind: weatherData.forecast.forecastday[0].day.maxwind_kph,
  };
}

function conditionImage(data) {
  const containerEl = document.querySelector(".city-mainbox");

  const containerImage = getConditionImagePath(
    data.current.condition.code,
    data.current.is_day !== 1
  );

  if (containerImage) {
    containerEl.style.backgroundImage = `url(${containerImage})`;
  }
}

function displayWeather(weatherData) {
  wearherAppEl.innerHTML += `
    <div class="city-mainbox ">
        <div class="create-city">
            <h2 class="create-city__title">${weatherData.cityName}</h2>
            <h1 class="create-city__temp" >${formattemperature(
              weatherData.temperature
            )}</h1>
            <p class="create-city__condition">${weatherData.condition}</p>
            <div class="create-city__temperature">
              <span>H:${weatherData.maxTemp}°</span>
              <span>T:${weatherData.mintemp}°</span>
            </div>
        </div>

        <div class="forecast-box">
          <div class="forecast-box__today">
            <p class="forecast-box__text">Heute ${weatherData.conditionDay}.</p>
            <p class="forecast-box__text">Wind bis zum ${
              weatherData.maxWind
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
}

function gethours(weatherData) {
  const locatTime = weatherData.location.localtime_epoch * 1000;
  const time = new Date(locatTime).getHours();
  console.log(time);

  return time;
}

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
          <img class="weekday-box__icon" src="https:${icon}" alt="" />
          <p>H:${maxTemp}°</p>
          <p>T:${mintemp}°</p>
          <p>${wind} km/h</p>
        </div>
      </div>
    `;
  }
}

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
