export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          AI-Powered Weather & News Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1 bg-white rounded-2xl shadow p-4">
            <h2 className="font-semibold mb-2">Weather</h2>
            <p>Weather info goes here</p>
          </div>

          <div className="md:col-span-2 bg-white rounded-2xl shadow p-4">
            <h2 className="font-semibold mb-2">News</h2>
            <p>Trending news articles here</p>
          </div>

          <div className="md:col-span-3 bg-white rounded-2xl shadow p-4">
            <h2 className="font-semibold mb-2">AI Summary</h2>
            <p>AI-generated summary placeholder</p>
          </div>
        </div>
      </div>
    </div>
  );
}
