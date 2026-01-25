// src/components/NewsCard.jsx
export default function NewsCard({ article }) {
  return (
    <div className="bg-neutral-900 text-slate-200 border border-white/50 rounded-lg shadow p-4
            transition-all duration-300
            hover:shadow-xl hover:scale-[1.01] flex flex-col md:flex-row gap-4">
      {/* Article Image */}
      {article.image ? (
        <img
          src={article.image}
          alt={article.title}
          className="w-full md:w-48 h-32 object-cover rounded-lg"
        />
      ) : (
        <div className="w-full md:w-48 h-32 bg-gray-300 rounded-lg flex items-center justify-center text-gray-600">
          No Image
        </div>
      )}

      {/* Article Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-lg">{article.title}</h3>
          {article.description && (
            <p className="text-sm text-slate-300 mt-1 line-clamp-3">
              {article.description}
            </p>
          )}
        </div>
        <div className="mt-2 flex justify-between items-center text-sm text-slate-400">
          <span>{article.source?.name || "Unknown Source"}</span>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Read more
          </a>
        </div>
      </div>
    </div>
  );
}
