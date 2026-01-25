export async function fetchSummary(articles) {
  const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

  if (!articles || articles.length === 0) return "No news articles to summarize.";

  const headlines = articles.map(a => a.title).join("\n");

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Summarize the following news headlines in 2-3 concise sentences:\n${headlines}`,
          },
        ],
        max_tokens: 150,
      }),
    });

    if (!response.ok) {
      console.error("OpenAI API error:", response.status, response.statusText);
      if (response.status === 429) {
        return "AI summary will be available once API credits are added.";
      }
      return "Failed to generate summary (API error).";
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "No summary available.";
  } catch (err) {
    console.error("Error fetching summary:", err);
    return "Failed to generate summary (network error).";
  }
}


