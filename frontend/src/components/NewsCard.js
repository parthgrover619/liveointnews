import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, TrendingUp } from 'lucide-react';

const NewsCard = ({ article, featured = false }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  if (featured) {
    return (
      <Link
        to={`/news/${article.id}`}
        className="group block bg-white border border-border overflow-hidden perspective-container animate-fadeInUp"
        data-testid={`featured-news-${article.id}`}
        style={{ animationDelay: '0.1s' }}
      >
        <div className="relative card-3d">
          {article.image && (
            <div className="aspect-[16/9] overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {article.trending && (
                <div className="absolute top-4 right-4 z-20 px-4 py-2 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center space-x-2 animate-float shadow-lg">
                  <TrendingUp size={14} />
                  <span>TRENDING</span>
                </div>
              )}
            </div>
          )}
          <div className="p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-primary">
                  {article.category}
                </span>
                <div className="h-1 w-12 bg-gradient-to-r from-primary to-accent"></div>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black playfair leading-tight mb-4 group-hover:gradient-text transition-all duration-300">
                {article.title}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">{article.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Calendar size={16} />
                  <span>{formatDate(article.created_at)}</span>
                </div>
                <span className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-full flex items-center space-x-2 group-hover:bg-secondary group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-105">
                  <span>READ MORE</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/news/${article.id}`}
      className="group block bg-white border border-border overflow-hidden perspective-container animate-fadeInUp"
      data-testid={`news-card-${article.id}`}
      style={{ animationDelay: '0.2s' }}
    >
      <div className="relative card-3d h-full">
        {article.image && (
          <div className="aspect-[16/9] overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700"
            />
            {article.trending && (
              <div className="absolute top-3 right-3 z-20 px-3 py-1 bg-accent text-accent-foreground text-xs font-bold rounded-full shadow-lg">
                HOT
              </div>
            )}
          </div>
        )}
        <div className="p-6 relative">
          <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-secondary/5 to-transparent rounded-full blur-2xl"></div>
          <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-3">
              <div className="h-1 w-8 bg-primary"></div>
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-primary">
                {article.category}
              </span>
            </div>
            <h3 className="text-xl font-bold playfair leading-tight mb-3 group-hover:text-primary transition-colors duration-300">
              {article.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">{article.excerpt}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Calendar size={12} />
                <span>{formatDate(article.created_at)}</span>
              </div>
              <ArrowRight size={18} className="text-primary group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;