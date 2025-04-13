const LOCAL_STORAGE_KEY = "savedCities";

export function saveToLocalStorage(cityId, cityName) {
  const savedCities = getSavedCity(cityName);

  if (savedCities.includes(String(cityId))) {
    alert(`${cityName}  wurde zu den Favoriten hinzugefügt.`);
    return;
  }

  savedCities.push(String(cityId));

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedCities));
}

export function getSavedCity() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
}

export function removeCityLocalStorage(cityId) {
  const savedCities = getSavedCity().filter((id) => id !== cityId);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedCities));
}
