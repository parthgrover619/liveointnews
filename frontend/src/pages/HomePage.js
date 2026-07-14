import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsCard from '@/components/NewsCard';
import { Mail, TrendingUp, MapPin, CheckCircle } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const HomePage = () => {
  const [featuredNews, setFeaturedNews] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [trendingNews, setTrendingNews] = useState([]);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const [featured, latest, trending] = await Promise.all([
        axios.get(`${API}/news?featured=true&limit=1`),
        axios.get(`${API}/news?limit=6`),
        axios.get(`${API}/news?trending=true&limit=4`),
      ]);
      
      setFeaturedNews(featured.data);
      setLatestNews(latest.data);
      setTrendingNews(trending.data);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await axios.post(`${API}/newsletter/subscribe`, { email });
      setMessage('Successfully subscribed! Check your email for confirmation.');
      setEmail('');
    } catch (error) {
      setMessage(error.response?.data?.detail || 'Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const districts = [
    'Shimla', 'Theog', 'Kullu', 'Mandi', 'Kangra', 'Solan', 'Hamirpur', 'Una',
    'Bilaspur', 'Chamba', 'Sirmaur', 'Kinnaur', 'Lahaul & Spiti'
  ];

  const testimonials = [
    {
      name: 'Rohit Sharma',
      location: 'Theog',
      text: 'Most reliable source for local news. I check Live Point News every morning.',
    },
    {
      name: 'Priya Verma',
      location: 'Shimla',
      text: 'Finally, unbiased news coverage from Himachal. Keep up the great work!',
    },
    {
      name: 'Anil Kumar',
      location: 'Kullu',
      text: 'Fast and accurate reporting. Live Point News keeps us informed about what matters.',
    },
  ];

  const trustFeatures = [
    { icon: CheckCircle, title: 'Fast & Verified News', desc: 'Breaking news verified before publishing' },
    { icon: MapPin, title: 'Himachal-First Coverage', desc: 'Every district, every story' },
    { icon: CheckCircle, title: 'Unbiased Journalism', desc: 'People before politics' },
    { icon: TrendingUp, title: 'Real-Time Updates', desc: 'Stay ahead with instant alerts' },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section with Featured News */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black playfair tracking-tight leading-none mb-4" data-testid="hero-title">
            Hyperlocal Himachal Coverage
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground">Breaking News, First & Fast</p>
        </div>

        {featuredNews.length > 0 && (
          <div className="mb-12">
            <NewsCard article={featuredNews[0]} featured={true} />
          </div>
        )}
      </section>

      {/* Latest Headlines */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold playfair tracking-tight" data-testid="latest-news-heading">
            Latest Headlines
          </h2>
          <Link
            to="/news"
            className="text-primary font-medium text-sm hover:underline"
            data-testid="view-all-news"
          >
            View All News
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestNews.slice(0, 6).map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* Trending News */}
      {trendingNews.length > 0 && (
        <section className="bg-muted py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 mb-8">
              <TrendingUp className="text-accent" size={28} />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold playfair tracking-tight">
                Trending Now
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingNews.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Trust Live Point News */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold playfair tracking-tight text-center mb-12">
          Why Trust Live Point News
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustFeatures.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <feature.icon size={32} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* District Coverage */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold playfair tracking-tight text-center mb-8">
            District Coverage
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            We cover news from every district of Himachal Pradesh
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {districts.map((district, index) => (
              <Link
                key={index}
                to={`/news?district=${district.toLowerCase()}`}
                className="p-4 border border-border text-center hover:border-primary hover:bg-primary/5 transition-all duration-200"
                data-testid={`district-${district.toLowerCase()}`}
              >
                <MapPin size={20} className="mx-auto mb-2 text-primary" />
                <span className="text-sm font-medium">{district}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-border p-8 text-center">
          <svg className="w-12 h-12 mx-auto mb-4 text-primary fill-current" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          <h2 className="text-2xl sm:text-3xl font-bold playfair mb-4">Watch Us on YouTube</h2>
          <p className="text-muted-foreground mb-6">Video news coverage coming soon!</p>
          <span className="inline-block px-6 py-2 bg-accent text-accent-foreground font-semibold rounded">
            Coming Soon
          </span>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-foreground text-white py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Mail size={48} className="mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold playfair mb-4" data-testid="newsletter-heading">
            Get Instant Local Alerts
          </h2>
          <p className="text-gray-300 mb-8">
            Subscribe for daily Himachal updates delivered straight to your inbox
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 rounded text-foreground"
              data-testid="newsletter-email-input"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded hover:bg-primary/90 disabled:opacity-50 transition-colors duration-200"
              data-testid="newsletter-submit-button"
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>

          {message && (
            <p className={`mt-4 text-sm ${message.includes('Success') ? 'text-green-400' : 'text-red-400'}`} data-testid="newsletter-message">
              {message}
            </p>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold playfair tracking-tight text-center mb-12">
          What Our Readers Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white border border-border p-6">
              <p className="text-muted-foreground italic mb-4">&ldquo;{testimonial.text}&rdquo;</p>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
