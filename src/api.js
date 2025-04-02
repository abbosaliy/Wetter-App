const apiKey = "0ecff552f23a45c2bc7200708252602";

export async function searchCityInAPI(cityName) {
  const url = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${cityName}&lang=de`;
  const response = await fetch(url);
  const result = await response.json();
  return result;
}

export async function fetchWeatherData(cityId) {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=id:${cityId}&lang=de&days=3`;
  const response = await fetch(url);
  const result = await response.json();
  return result;
}
