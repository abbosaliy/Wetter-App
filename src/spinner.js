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
