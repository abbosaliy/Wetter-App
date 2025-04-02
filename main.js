import { fetchWeatherData, searchCityInAPI } from "./src/api";
import { handleCityData } from "./src/addCity";


import "./styles/main.scss";
const wearherAppEl = document.getElementById("app");

// TODU:1 haupt html und suche teile
export function menuHeader() {
  wearherAppEl.innerHTML = ` 
  
      <div class="header-app">
          <div class="header-app__nav">
              <h2 class="header-app__nav-text">Wetter</h2>
              <button class="header-app__nav-button">Bearbeiten</button>
          </div>
          <div class="header-app__search">
              <input 
                id="searchInput"
                class="header-app__search-input"
                autocomplete="off"
                type="text"
                placeholder="Nach stadt suchen"
              />
          </div>

          <div id="suggestions" class="header-app__cityListe">
           
          </div>
          
      </div>
  `;

  const searchInputEl = document.getElementById("searchInput");
  const sugesstionsEl = document.getElementById("suggestions");

  //TODU:2 city suche fn

  async function searchCity() {
    const cityName = searchInputEl.value;

    sugesstionsEl.innerHTML = "";

    if (cityName.length < 3) return;

    const citiesData = await searchCityInAPI(cityName);
    console.log(citiesData);

    displayCities(citiesData);
  }

  searchInputEl.addEventListener("input", searchCity);

  function displayCities(citiesData) {

    //TODU:3 gefundene city 

    if (!citiesData) return;

    citiesData.slice(0, 5).forEach((index) => {
      const cityListe = document.createElement("div");

      cityListe.classList.add("cityforeeach");
      cityListe.innerHTML = `<p>${index.name}</p> <p>${index.country}</p>`;
      const cityId = index.id;
      console.log(cityId);

      cityListe.addEventListener("click", function () {
        getWeatherById(cityId);
        sugesstionsEl.innerHTML = "";
      });

      sugesstionsEl.appendChild(cityListe);
    });
  }
}

async function getWeatherById(cityId) {
  const cityWeatherDataForecast = await fetchWeatherData(cityId);

  //TODU:4 - ausgewelte city  daten von der API holen über Id un übergeben 
  handleCityData(cityWeatherDataForecast);

  console.log(cityWeatherDataForecast);

  console.log(` city id ${cityId}`);
}

menuHeader();
