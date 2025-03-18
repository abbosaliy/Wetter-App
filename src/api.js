const apiKey = "0ecff552f23a45c2bc7200708252602";

export async function fetchWeather(cityName) {
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&lang=de&days=3`;
  const response = await fetch(url);
  const result = await response.json();
  return result;
}


