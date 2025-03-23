const wearherAppEl = document.getElementById("app");

export function renderSpinner(cityName) {
  wearherAppEl.innerHTML = spinner(cityName);
}

function spinner(cityName) {
  return `
      <div class="spinner">
          <div class="spinner-text">Lade wetter für ${cityName}</div>
          <div class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
      </div>`;
}

export function removeSpinner() {
  const spinnerEl = document.querySelector(".spinner");

  if (spinnerEl) {
    spinnerEl.remove();
  }
}

export function removeSpinnerMenue() {
  const spinnerEl = document.getElementById("spinner");
  if (spinnerEl) {
    spinnerEl.remove(); // Spinnerni DOM dan olib tashlash
  }
}
export function menuSpinner() {
  wearherAppEl.innerHTML += `
      <div id="spinner"  class="spinner">
          <div class="spinner-text">Lade übersicht</div>
          <div class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
      </div>`;
}
