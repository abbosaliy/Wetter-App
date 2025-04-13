import { wearherAppEl } from "../main";
import { handleCityData } from "./addCity";
import { searchCityInAPI } from "./api";
import { renderCity } from "./favoriten";
import { removeCityLocalStorage } from "./localStorage";
import { showSpinnerMenu } from "./spinner";

export async function renderMainMenu() {
  showSpinnerMenu();

  const favoritenCity = await renderCity();

  let favoritenContent = "";

  if (!favoritenCity || favoritenCity === "") {
    favoritenContent = `<em class="favoriten-text">Noch keien favoriten gespaichert</em>`;
  } else {
    favoritenContent = favoritenCity;
  }

  wearherAppEl.innerHTML = `
    <div class="main-menu">
      ${menuHeader()}
    </div>
  
    <div class="favoriten-cities__liste">
      ${favoritenContent}
    </div>
 `;

  const searchInputEl = document.getElementById("searchInput");
  const sugesstionsEl = document.getElementById("suggestions");

  const debounceInput = debounce(async function () {
    const cityName = searchInputEl.value;
    sugesstionsEl.innerHTML = "";

    if (cityName.length < 3) return;

    sugesstionsEl.classList.remove("display");

    const citiesData = await searchCityInAPI(cityName);

    displayCities(citiesData, sugesstionsEl);
  }, 500);

  searchInputEl.addEventListener("input", debounceInput);

  const favoritenEl = document.querySelectorAll(".city-info");

  favoritenEl.forEach((cityEL) => {
    cityEL.addEventListener("click", () => {
      
      const cityBox = cityEL.closest(".city-content");
      const cityId = cityBox.getAttribute("data-city-id");
      const cityName = cityBox.getAttribute("data-city-name");

      handleCityData(cityId, cityName);
    });
  });

  const removeButtons = document.querySelectorAll(".city-remove__Btn");

  removeButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const cityBox = btn.closest(".city-content");
      const cityId = cityBox.getAttribute("data-city-id");

      removeCityLocalStorage(cityId);
      cityBox.remove();
    });
  });

  const editBtn = document.querySelector(".header-app__nav-button");

  editBtn.addEventListener("click", function () {
    const isEditing = editBtn.textContent === "Bearbeiten";

    const removeBtnDisplay = document.querySelectorAll(".city-remove__display");

    if (isEditing) {
      editBtn.textContent = "Fertig";

      removeBtnDisplay.forEach((btn) => {
        btn.style.display = "block";
      });
    } else {
      editBtn.textContent = "Bearbeiten";

      removeBtnDisplay.forEach((btn) => {
        btn.style.display = "none";
      });
    }
  });
}

function displayCities(citiesData, sugesstionsEl) {
  if (!citiesData) return;

  citiesData.slice(0, 5).forEach((index) => {
    const cityListe = document.createElement("div");

    cityListe.classList.add("inputCity-liste");

    cityListe.innerHTML = `
      <p>${index.name}</p> 
      <p>${index.country}</p>`;

    const cityName = index.name;
    const cityId = index.id;

    sugesstionsEl.appendChild(cityListe);

    cityListe.addEventListener("click", function () {
      handleCityData(cityId, cityName);
    });
  });

  const appEl = document.getElementById("app");

  appEl.addEventListener("click", function () {
    sugesstionsEl.classList.add("display");
  });
}

export function menuHeader() {
  return ` 
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
}

function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
