export default function NewsCard({ article }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="rounded-xl mb-3 w-full h-40 object-cover"
        />
      )}
      <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
      <p className="text-sm text-gray-600 mb-3">
        {article.description || "No description available."}
      </p>
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 font-medium hover:underline"
      >
        Read more →
      </a>
    </div>
  );
}
