import { useState, useEffect } from "react";
import { fetchWeather } from "../services/weatherService";
import { fetchNews } from "../services/newsService";
import { fetchSummary } from "../services/aiService";
import NewsCard from "../components/NewsCard";
import Navbar from "../components/Navbar";


export default function Dashboard() {
  // Weather states
  const [city, setCity] = useState([]);
  const [weather, setWeather] = useState(null);
  const [weatherError, setWeatherError] = useState(null);

  // News states
  const [news, setNews] = useState([]);
  const [topic, setTopic] = useState("general");
  const [newsLoading, setNewsLoading] = useState(true);

  // AI Summary state
  const [summary, setSummary] = useState("Loading summary...");
  const [summaryLoading, setSummaryLoading] = useState(true);

  // Weather search
  const handleSearch = async () => {
    try {
      const data = await fetchWeather(city);
      if (data.cod === "404") {
        setWeatherError("Please enter a valid city name.");
        setWeather(null);
        return;
      }
      setWeather(data);
      setWeatherError(null);
    } catch (err) {
      setWeatherError("Please enter a valid city name.");
      setWeather(null);
    }
  };

  // Fetch news and AI summary when topic changes
  useEffect(() => {
    const loadNewsAndSummary = async () => {
      setNewsLoading(true);
      setSummaryLoading(true);

      try {
        const articles = await fetchNews(topic);
        setNews(articles || []);
        setNewsLoading(false);

        const summaryText = await fetchSummary(articles);
        setSummary(summaryText);
        setSummaryLoading(false);
      } catch (err) {
        console.error("Error loading news/summary:", err);
        setNews([]);
        setNewsLoading(false);
        setSummary("Failed to generate summary.");
        setSummaryLoading(false);
      }
    };

    loadNewsAndSummary();
  }, [topic]);

  return (
    <div className="min-h-screen bg-black text-gray-700">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">
        

        <div className="grid md:grid-cols-3 gap-6">
          {/* WEATHER CARD */}
          <div className="md:col-span-1 bg-white dark:bg-black rounded-2xl shadow p-4
          border border-white/50
            transition transform duration-300
            hover:-translate-y-1 hover:shadow-lg">
            <h2 className="font-semibold mb-2 text-white"><span className="text-1xl">🌤️</span>Weather</h2>

            {/* Search Bar */}
            <div className="flex mb-3">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="flex-1 border rounded-l px-3 py-2 outline-none bg-neutral-900 text-slate-100"
                placeholder="Enter city name"
              />
              <button
                onClick={handleSearch}
                className="bg-neutral-900 text-white px-4 py-2 rounded-r
                 border-t border-r border-b transition-all duration-200
                 hover:bg-slate-700 active:scale-95"
              >
                Search
              </button>
            </div>

            {/* Weather Output */}
            {weatherError && (
              <p className="text-red-500 font-semibold">{weatherError}</p>
            )}

            {weather && !weatherError && (
              <div className="space-y-2">
                <p className="text-3xl text-slate-100">{Math.round(weather.main.temp)}°C</p>
                <p className="capitalize text-slate-100">{weather.weather[0].description}</p>
                <p className="text-slate-100">Humidity: {weather.main.humidity}%</p>
                <p className="text-slate-100">Wind: {weather.wind.speed} m/s</p>
              </div>
            )}
          </div>

          {/* NEWS CARD */}
          <div className="md:col-span-2 bg-white dark:bg-black rounded-2xl shadow p-4
            transition transform duration-300
            border border-white/50
            hover:-translate-y-1 hover:shadow-lg">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold text-white"><span className="text-1xl">📰</span>Trending News</h2>

              {/* Topic Filter */}
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="border bg-neutral-900 text-slate-100 rounded px-2 py-1 text-sm outline-none"
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

            {newsLoading ? (
              <p className="text-gray-300">Loading latest {topic} headlines...</p>
            ) : news.length > 0 ? (
              <div className="grid gap-4">
                {news.map((article, index) => (
                  <NewsCard key={index} article={article} />
                ))}
              </div>
            ) : (
              <p className="text-gray-300">No news articles found for {topic}.</p>
            )}
          </div>

          {/* AI SUMMARY CARD */}
          <div className="md:col-span-3 bg-white dark:bg-black rounded-2xl shadow p-4
          border border-white/50
            transition transform duration-300
            hover:-translate-y-1 hover:shadow-lg">
            <h2 className="font-semibold mb-2 text-white"><span className="text-1xl">🔮</span>AI Summary</h2>
            {summaryLoading ? (
              <p className="text-gray-300">Generating summary...</p>
            ) : (
              <p className="text-gray-300">{summary}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
