import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';

const NewsCard = ({ article, featured = false }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  if (featured) {
    return (
      <Link
        to={`/news/${article.id}`}
        className="group block bg-white border border-border overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
        data-testid={`featured-news-${article.id}`}
      >
        {article.image && (
          <div className="aspect-[16/9] overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-primary">
              {article.category}
            </span>
            {article.trending && (
              <span className="px-2 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded">
                Trending
              </span>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold playfair leading-tight mb-3 group-hover:text-primary transition-colors duration-200">
            {article.title}
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">{article.excerpt}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Calendar size={14} />
              <span>{formatDate(article.created_at)}</span>
            </div>
            <span className="text-primary font-medium text-sm flex items-center space-x-1 group-hover:space-x-2 transition-all duration-200">
              <span>Read More</span>
              <ArrowRight size={16} />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/news/${article.id}`}
      className="group block bg-white border border-border overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
      data-testid={`news-card-${article.id}`}
    >
      {article.image && (
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-2">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-primary">
            {article.category}
          </span>
          {article.trending && (
            <span className="px-2 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded">
              Trending
            </span>
          )}
        </div>
        <h3 className="text-lg font-bold playfair leading-tight mb-2 group-hover:text-primary transition-colors duration-200">
          {article.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">{article.excerpt}</p>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Calendar size={12} />
          <span>{formatDate(article.created_at)}</span>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;