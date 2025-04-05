import { menuHeader } from "../main";
import { handleCityData } from "./addCity";
import { getConditionImagePath } from "./condition";
import { getSavedCity, saveToLocalStorage } from "./localStorage";
import { formattemperature } from "./utils";

const wearherAppEl = document.getElementById("app");

//TODU:1

export function saveFavoritenCity(weatherData) {
  saveToLocalStorage(weatherData);

  const savedCity = getSavedCity();
  const currentCity = savedCity[savedCity.length - 1];

  wearherAppEl.innerHTML += `
 ${renderCity(currentCity)}
 `;
  clickCity(currentCity);
  conditionImageMenu(currentCity);
}

function clickCity(weatherData) {
  const cityNameEl = document.querySelectorAll(".city-content");
  cityNameEl.forEach((city) => {
    city.addEventListener("click", () => {
      handleCityData(weatherData);
    });
  });
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
