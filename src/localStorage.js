const LOCAL_STORAGE_KEY = "city";

export function saveToLocalStorage(weatherData) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(weatherData));
}

export function getSavedCity() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
}
