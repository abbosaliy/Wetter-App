import { wearherAppEl } from "../main";

export function showSpinner() {
  wearherAppEl.innerHTML = laodingSpinnerHtml();
}

export function laodingSpinnerHtml() {
  return `
      <div id="spinner" class="spinner">
          <div class="spinner-text">Lade Übersicht...</div>
          <div class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
      </div>`;
}

export function showSpinnerCity(cityName) {
  wearherAppEl.innerHTML = laodingSpinnerHtmlEl(cityName);
}

export function laodingSpinnerHtmlEl(cityName) {
  return `
      <div id="spinner" class="spinner">
          <div class="spinner-text">Lade Wetter  für ${cityName}</div>
          <div class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
      </div>`;
}
