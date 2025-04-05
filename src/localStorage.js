const LOCAL_STORAGE_KEY = "city";

export function saveToLocalStorage(weatherData) {
  const savedCities = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

  savedCities.push(weatherData);

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedCities));
}

export function getSavedCity() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
}
