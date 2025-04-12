const LOCAL_STORAGE_KEY = "city";

export function saveToLocalStorage(cityId, cityName) {
  const savedCities = getSavedCity();

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
