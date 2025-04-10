import { fetchWeatherData } from "./api";
import { getConditionImagePath } from "./condition";
import { saveToLocalStorage, getSavedCity } from "./localStorage";
import { formattemperature } from "./utils";

//TODU:1

export function saveFavoritenCity(weatherData, cityId) {
  console.log(weatherData, cityId);

  const currentCity = weatherData;
  renderCity();
  saveToLocalStorage(cityId);
}

export async function renderCity() {
  const savedCity = getSavedCity();
  console.log(savedCity);

  let html = "";

  for (const cityId of savedCity) {
    const data = await fetchWeatherData(cityId);

    html += `
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

  return html;
}
