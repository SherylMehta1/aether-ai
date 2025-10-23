// src/services/newsService.js

const API_KEY = import.meta.env.VITE_GNEWS_API_KEY; // or your NewsAPI key

/**
 * Fetch news articles based on category/topic (English only)
 * @param {string} category - e.g., "general", "technology", "sports"
 * @returns {Array} Array of news articles
 */
export async function fetchNews(category = "general") {
  try {
    const url = `https://gnews.io/api/v4/top-headlines?country=in&category=${category}&lang=en&max=5&apikey=${API_KEY}`;

    const res = await fetch(url);
    const data = await res.json();

    if (!data.articles || data.articles.length === 0) {
      console.warn(`⚠️ No articles found for category: ${category}`, data);
      return [];
    }

    return data.articles;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}
