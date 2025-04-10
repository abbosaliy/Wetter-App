const LOCAL_STORAGE_KEY = "city";

export function saveToLocalStorage(cityId) {
  const savedCities = getSavedCity();
  
  if (savedCities.find((city) => city === cityId)) {
    alert(cityId + "gespeichert");
    return;
  }

  savedCities.push(cityId);

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedCities));
}

export function getSavedCity() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
}
