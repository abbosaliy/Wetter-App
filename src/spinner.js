import { wearherAppEl } from "../main";

export function laodingSpinner(name) {
  wearherAppEl.innerHTML = laodingSpinnerHtml(name);
  console.log(name);
}

export function laodingSpinnerHtml(cityName) {
  return `
      <div id="spinner" class="spinner">
          <div class="spinner-text">Lade wetter für ${cityName}</div>
          <div class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
      </div>`;
}
