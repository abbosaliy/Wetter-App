import { fetchWeather } from "./api";
import { getConditionImagePath } from "./condition";
import { getCityName } from "./createcity";
import { menuSpinner, removeSpinnerMenue } from "./spinner";
import { formattemperature } from "./utils";

const wearherAppEl = document.getElementById("app");




export async function renderMenue(cityName) {
  menuSpinner();
  const weatherData = await fetchWeather(cityName);
  console.log(weatherData);

  setTimeout(() => {
    wearherAppEl.innerHTML += `
    ${menuHeader()}
    ${renderCity(weatherData)}
 
    `;

    removeSpinnerMenue();
    conditionImageMenu(weatherData);
    clickCity(cityName);
  });
}



function clickCity(cityName) {
  const cityNameEl = document.querySelectorAll(".city-content");

  cityNameEl.forEach((city) => {
    city.addEventListener("click", () => {
      getCityName(cityName);
    });
  });
}




function menuHeader() {
  return `
      <div class="header-app">
          <div class="header-app__nav">
              <h2 class="header-app__nav-text">Wetter</h2>
              <button class="header-app__nav-button">Bearbeiten</button>
          </div>
          <div class="header-app__search">
              <input
                class="header-app__search-input"
                autocomplete="off"
                type="text"
                placeholder="Nach stadt suchen"
              />
          </div>
      </div>
  `;
}

function conditionImageMenu(data) {
  
  const containerEl = document.querySelector(".city-info");

  const containerImage = getConditionImagePath(
    data.current.condition.code,
    data.current.is_day !== 1
  );

  if (containerImage) {
    containerEl.style.backgroundImage = `url(${containerImage})`;
  }
}

function renderCity(data) {
  return `
    <div class="city-content">
        <div></div>
        <div class="city-info">
            <div class="city-info__left">
                <div class="city-info__left-location">
                    <h5>${data.location.name}</h5>
                    <p>${data.location.country}</p>
                </div>
                <div class="city-info__left-condition">
                    <span>${data.current.condition.text}</span>
                </div>
            </div>
            <div class="city-info__right">
                <div class="city-info__right-temperature">${formattemperature(
                  data.current.temp_c
                )}°</div>
                <div class="city-info__right-min-max-temperature">
                <span>H:${formattemperature(
                  data.forecast.forecastday[0].day.maxtemp_c
                )}°</span>
                <span>T:${formattemperature(
                  data.forecast.forecastday[0].day.mintemp_c
                )}°</span>
                </div>
            </div>
        </div>
      </div>
    `;
}
