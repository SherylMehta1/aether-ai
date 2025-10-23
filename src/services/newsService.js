export async function fetchNews() {
  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  const url = `https://newsapi.org/v2/everything?q=India&language=en&pageSize=5&sortBy=publishedAt&apiKey=${API_KEY}`;
  
  console.log("📰 Fetching news from:", url);

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("✅ News API response:", data);
    
    if (data.status === "ok" && data.articles.length > 0) {
      return data.articles;
    } else {
      console.warn("⚠️ No articles found in response:", data);
      return [];
    }
  } catch (error) {
    console.error("❌ Error fetching news:", error);
    return [];
  }
}

