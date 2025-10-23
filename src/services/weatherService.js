export async function fetchWeather(city) {
  // Access the API key
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
  console.log("Loaded API Key:", API_KEY);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("City not found");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}
