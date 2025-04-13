import { fetchWeatherData } from "./api";
import { getConditionImagePath } from "./condition";
import { getSavedCity } from "./localStorage";
import { formattemperature } from "./utils";

export async function renderCity() {
  const savedCity = getSavedCity();

  savedCity.filter((city) => city === savedCity);

  let html = "";

  for (const cityId of savedCity) {
    
    const data = await fetchWeatherData(cityId);
    const containerImage = getConditionImagePath(
      data.current.condition.code,
      data.current.is_day !== 1
    );

    html += `
          <div class="city-content"
              data-city-id="${cityId}" data-city-name="${data.location.name}">
          <div class="city-remove  city-remove__display">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="city-remove__Btn">
                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
          </div>
          <div class="city-info"  style ="background-image:linear-gradient(0deg, rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${containerImage})"  >
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
        </div>`;
  }

  return html;
}
