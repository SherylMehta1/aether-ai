import { useState, useEffect } from "react";
import { fetchWeather } from "../services/weatherService";
import { fetchNews } from "../services/newsService";
import NewsCard from "../components/NewsCard";

export default function Dashboard() {
  // State for weather
  const [city, setCity] = useState("Delhi");
  const [weather, setWeather] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [errorWeather, setErrorWeather] = useState(null);

  // State for news
  const [news, setNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);

  // Fetch weather when user clicks search
  async function handleSearch() {
    setLoadingWeather(true);
    setErrorWeather(null);
    try {
      const data = await fetchWeather(city);
      setWeather(data);
    } catch (err) {
      setErrorWeather("Could not fetch weather data.");
    } finally {
      setLoadingWeather(false);
    }
  }

  // Fetch news on mount
  useEffect(() => {
    async function loadNews() {
      const articles = await fetchNews("in");
      setNews(articles);
      setLoadingNews(false);
    }
    loadNews();
  }, []);

  // Auto-load weather for default city
  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          AI-Powered Weather & News Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* 🌤️ Weather Section */}
          <div className="md:col-span-1 bg-white rounded-2xl shadow p-4">
            <h2 className="font-semibold mb-3 text-xl">Weather</h2>

            <div className="flex mb-4">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name"
                className="border border-gray-300 rounded-l-lg p-2 w-full outline-none"
              />
              <button
                onClick={handleSearch}
                className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600 transition"
              >
                Search
              </button>
            </div>

            {loadingWeather ? (
              <p>Loading weather...</p>
            ) : errorWeather ? (
              <p className="text-red-500">{errorWeather}</p>
            ) : weather ? (
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">{weather.name}</h3>
                <p className="text-gray-700 capitalize">
                  {weather.weather[0].description}
                </p>
                <p className="text-4xl font-semibold">
                  {Math.round(weather.main.temp)}°C
                </p>
                <p>💧 Humidity: {weather.main.humidity}%</p>
                <p>🌬️ Wind: {weather.wind.speed} m/s</p>
              </div>
            ) : (
              <p>No weather data yet.</p>
            )}
          </div>

          {/* 📰 News Section */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow p-4">
            <h2 className="font-semibold mb-3 text-xl">Trending News</h2>

            {loadingNews ? (
              <p>Loading latest headlines...</p>
            ) : news.length > 0 ? (
              <div className="grid gap-4">
                {news.map((article, index) => (
                  <NewsCard key={index} article={article} />
                ))}
              </div>
            ) : (
              <p>No news available right now.</p>
            )}
          </div>

          {/* 🤖 AI Summary Section */}
          <div className="md:col-span-3 bg-white rounded-2xl shadow p-4">
            <h2 className="font-semibold mb-3 text-xl">AI Summary</h2>
            <p>AI-generated summary placeholder (coming soon on Day 4 🚀)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
