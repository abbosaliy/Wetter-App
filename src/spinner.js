const wearherAppEl = document.getElementById("app");

export function renderSpinnerRemove(m) {
  const spinnerIdel = document.getElementById("spinner");

  if (spinnerIdel) {
    spinnerIdel.remove();
  }
}
export function LoadingSpinnerHtml(cityName) {
  wearherAppEl.innerHTML += `
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
