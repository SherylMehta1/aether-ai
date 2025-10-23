import { useState, useEffect } from "react";
import { fetchWeather } from "../services/weatherService";
import { fetchNews } from "../services/newsService";
import NewsCard from "../components/NewsCard";

export default function Dashboard() {
  // Weather states
  const [city, setCity] = useState("Delhi");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  // News states
  const [news, setNews] = useState([]);
  const [topic, setTopic] = useState("general");

  // Weather search with proper error handling
  const handleSearch = async () => {
    try {
      const data = await fetchWeather(city);

      // Check for invalid city response from OpenWeatherMap
      if (data.cod === "404") {
        setError("Please enter a valid city name.");
        setWeather(null);
        return;
      }

      setWeather(data);
      setError(null);
    } catch (err) {
      setError("Please enter a valid city name.");
      setWeather(null);
    }
  };

  // Fetch news when topic changes
  useEffect(() => {
    const loadNews = async () => {
      const articles = await fetchNews(topic);
      setNews(articles || []);
    };
    loadNews();
  }, [topic]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          AI-Powered Weather & News Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* WEATHER CARD */}
          <div className="md:col-span-1 bg-white rounded-2xl shadow p-4">
            <h2 className="font-semibold mb-2">Weather</h2>

            {/* Search Bar */}
            <div className="flex mb-3">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="flex-1 border rounded-l px-3 py-2 outline-none"
                placeholder="Enter city name"
              />
              <button
                onClick={handleSearch}
                className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
              >
                Search
              </button>
            </div>

            {/* Weather Output */}
            {error && (
              <p className="text-red-500 font-semibold">{error}</p>
            )}

            {weather && !error && (
              <div className="space-y-2">
                <p className="text-lg font-semibold">{weather.name}</p>
                <p className="text-2xl">{Math.round(weather.main.temp)}°C</p>
                <p className="capitalize">{weather.weather[0].description}</p>
                <p>Humidity: {weather.main.humidity}%</p>
                <p>Wind: {weather.wind.speed} m/s</p>
              </div>
            )}
          </div>

          {/* NEWS CARD */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow p-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold">Trending News</h2>

              {/* Topic Filter Dropdown */}
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="border rounded px-2 py-1 text-sm outline-none"
              >
                <option value="general">General</option>
                <option value="technology">Technology</option>
                <option value="sports">Sports</option>
                <option value="health">Health</option>
                <option value="business">Business</option>
                <option value="science">Science</option>
                <option value="entertainment">Entertainment</option>
              </select>
            </div>

            {news.length > 0 ? (
              <div className="grid gap-4">
                {news.map((article, index) => (
                  <NewsCard key={index} article={article} />
                ))}
              </div>
            ) : (
              <p>Loading latest {topic} headlines...</p>
            )}
          </div>

          {/* AI SUMMARY CARD */}
          <div className="md:col-span-3 bg-white rounded-2xl shadow p-4">
            <h2 className="font-semibold mb-2">AI Summary</h2>
            <p>AI-generated summary placeholder</p>
          </div>
        </div>
      </div>
    </div>
  );
}
