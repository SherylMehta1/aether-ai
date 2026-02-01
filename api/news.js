export default async function handler(req, res) {
  const { category = "general" } = req.query;
  const API_KEY = process.env.VITE_GNEWS_API_KEY;

  const url = `https://gnews.io/api/v4/top-headlines?lang=en&category=${category}&max=3&apikey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
}
