import { useState } from "react";
import { fetchWeather } from "../services/weatherService";

export default function WeatherCard() {
  const [city, setCity] = useState("Delhi");
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    const data = await fetchWeather(city);
    setWeather(data);
  };
  
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h2 className="font-semibold mb-2">Weather</h2>

      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="border p-1 rounded mb-2 w-full"
      />
      <button onClick={getWeather} className="bg-blue-500 text-white px-3 py-1 rounded">
        Search
      </button>

      {weather && (
        <div className="mt-4">
          <p>Temp: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt="weather icon"
          />
        </div>
      )}
    </div>
  );
}
