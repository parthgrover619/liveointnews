import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VideoPlayer from '@/components/VideoPlayer';
import { Calendar, User, Share2 } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const NewsDetailPage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      const response = await axios.get(`${API}/news/${id}`);
      setArticle(response.data);
    } catch (error) {
      console.error('Error fetching article:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-center text-muted-foreground">Loading article...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-center text-muted-foreground">Article not found.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category and meta */}
        <div className="flex items-center space-x-3 mb-4">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-primary">
            {article.category}
          </span>
          {article.trending && (
            <span className="px-2 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded">
              Trending
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black playfair tracking-tight leading-tight mb-6" data-testid="article-title">
          {article.title}
        </h1>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-border">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <User size={16} />
            <span>{article.author}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Calendar size={16} />
            <span>{formatDate(article.created_at)}</span>
          </div>
          <button
            onClick={handleShare}
            className="flex items-center space-x-2 text-sm text-primary hover:underline"
            data-testid="share-button"
          >
            <Share2 size={16} />
            <span>Share</span>
          </button>
        </div>

        {/* Featured image or video */}
        {article.video_url ? (
          <div className="mb-8">
            <VideoPlayer url={article.video_url} title={article.title} />
          </div>
        ) : article.image ? (
          <div className="mb-8 rounded overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-auto"
            />
          </div>
        ) : null}

        {/* Content */}
        <div className="prose prose-lg max-w-none" data-testid="article-content">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>

        {/* Social share */}
        <div className="mt-12 pt-6 border-t border-border">
          <p className="text-sm font-semibold mb-4">Share this article:</p>
          <div className="flex items-center space-x-3">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-primary text-primary-foreground rounded-full hover:opacity-80 transition-opacity duration-200"
              title="Share on Facebook"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-secondary text-secondary-foreground rounded-full hover:opacity-80 transition-opacity duration-200"
              title="Share on Twitter"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default NewsDetailPage;