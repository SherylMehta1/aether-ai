// src/services/newsService.js

/**
 * Fetch news articles via Vercel API route (avoids CORS)
 * @param {string} category - e.g., "general", "technology", "sports"
 * @returns {Array} Array of news articles
 */
export async function fetchNews(category = "general") {
  try {
    const res = await fetch(`/api/news?category=${category}`);
    const data = await res.json();

    if (!data.articles || data.articles.length === 0) {
      console.warn(`⚠️ No articles returned for category: ${category}`, data);
      return [];
    }

    return data.articles;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}
