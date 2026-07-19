import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsCard from '@/components/NewsCard';
import {
  Mail, TrendingUp, CheckCircle, Radio, Zap, Clock, PlayCircle, Grid3x3, ArrowRight,
} from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const HomePage = () => {
  const [featuredNews, setFeaturedNews] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [trendingNews, setTrendingNews] = useState([]);
  const [liveNews, setLiveNews] = useState([]);
  const [breakingNews, setBreakingNews] = useState([]);
  const [videoNews, setVideoNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const location = useLocation();

  useEffect(() => {
    fetchAll();
  }, []);

  // Scroll to hash when arriving with one (e.g. /#live-news)
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 200);
    }
  }, [location, featuredNews, latestNews]);

  const fetchAll = async () => {
    try {
      const [featured, latest, trending, live, breaking, cats] = await Promise.all([
        axios.get(`${API}/news?featured=true&limit=5`),
        axios.get(`${API}/news?limit=12`),
        axios.get(`${API}/news?trending=true&limit=4`),
        axios.get(`${API}/news?tag=live&limit=4`),
        axios.get(`${API}/news?tag=breaking&limit=4`),
        axios.get(`${API}/categories`),
      ]);
      setFeaturedNews(featured.data);
      setLatestNews(latest.data);
      setTrendingNews(trending.data);
      setLiveNews(live.data);
      setBreakingNews(breaking.data);
      setCategories(cats.data);
      // Videos: from latest fetch, articles with video_url
      setVideoNews((latest.data || []).filter((a) => a.video_url).slice(0, 3));
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

  // Section heading component
  const SectionHeading = ({ icon: Icon, kicker, title, accent = 'primary', href }) => (
    <div className="flex items-end justify-between mb-6 border-b-2 border-border pb-3">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded ${accent === 'primary' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>
          <Icon size={22} />
        </div>
        <div>
          {kicker && (
            <span className={`text-[10px] uppercase tracking-[0.25em] font-black ${accent === 'primary' ? 'text-primary' : 'text-secondary'}`}>
              {kicker}
            </span>
          )}
          <h2 className="text-2xl sm:text-3xl font-black playfair leading-tight" data-testid={`heading-${(kicker || title).toLowerCase().replace(/\s+/g, '-')}`}>
            {title}
          </h2>
        </div>
      </div>
      {href && (
        <Link to={href} className="hidden sm:inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline whitespace-nowrap">
          View All <ArrowRight size={14} />
        </Link>
      )}
    </div>
  );

  // Placeholder when a section has no data yet
  const EmptyBlock = ({ label }) => (
    <div className="text-center py-8 bg-muted/40 border border-dashed border-border rounded-lg">
      <p className="text-sm text-muted-foreground">
        No {label} articles yet — check back soon.
      </p>
    </div>
  );

  const heroMain = featuredNews[0];
  const heroSide = featuredNews.slice(1, 5);

  return (
    <div className="min-h-screen relative">
      <div className="logo-watermark"></div>
      <Header />

      {/* Brand Banner - TV News Style */}
      <section
        className="relative overflow-hidden royal-blue-gradient py-8 sm:py-10 border-b-4 border-primary"
        data-testid="brand-banner"
      >
        <div className="absolute inset-0 world-map-bg opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>
        <div className="absolute -top-10 -right-20 w-96 h-96 bg-primary/20 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-10 -left-20 w-96 h-96 bg-secondary/20 blur-3xl rounded-full"></div>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="banner-shine"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-6 md:gap-10 animate-fadeInUp">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 bg-primary text-white text-[10px] sm:text-xs font-black uppercase tracking-widest px-2.5 py-1 rounded-sm shadow-lg">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                  Live
                </span>
                <span className="text-white/70 text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em]">Himachal Pradesh</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black playfair leading-none text-white text-shadow-premium tracking-tight" data-testid="hero-title">
                LIVE POINT <span className="text-primary">NEWS</span>
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-3 mt-3">
                <div className="h-0.5 w-8 bg-primary"></div>
                <p className="text-white/90 font-semibold text-sm sm:text-base tracking-wide">Breaking News, First &amp; Fast</p>
                <div className="h-0.5 w-8 bg-primary hidden sm:block"></div>
              </div>
            </div>

            <div className="hidden md:flex flex-col gap-2 border-l-2 border-white/20 pl-6">
              {['Verified', 'Unbiased', 'Real-Time'].map((label) => (
                <div key={label} className="flex items-center gap-2 text-white">
                  <CheckCircle size={18} className="text-primary" />
                  <span className="font-bold text-sm tracking-wide">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 1. HERO: Top Headlines & Featured News */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" data-testid="section-hero">
        <SectionHeading icon={Zap} kicker="Top Story" title="Featured Headlines" href="/news" />
        {heroMain ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <NewsCard article={heroMain} featured={true} />
            </div>
            <div className="flex flex-col gap-4">
              {heroSide.length > 0 ? (
                heroSide.map((article) => (
                  <div key={article.id} className="border-b border-border pb-4 last:border-b-0">
                    <NewsCard article={article} compact />
                  </div>
                ))
              ) : (
                latestNews.slice(0, 4).map((article) => (
                  <div key={article.id} className="border-b border-border pb-4 last:border-b-0">
                    <NewsCard article={article} compact />
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          <EmptyBlock label="featured" />
        )}
      </section>

      {/* 2. LIVE NEWS */}
      <section id="live-news" className="scroll-mt-24 bg-gradient-to-br from-red-50 to-white py-10" data-testid="section-live">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading icon={Radio} kicker="On Air Now" title="Live News" href="/news?tag=live" />
          {liveNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {liveNews.map((article) => (
                <div key={article.id} className="relative">
                  <span className="absolute top-2 left-2 z-10 inline-flex items-center gap-1.5 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-sm shadow-lg">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span> Live
                  </span>
                  <NewsCard article={article} />
                </div>
              ))}
            </div>
          ) : (
            <EmptyBlock label="live" />
          )}
        </div>
      </section>

      {/* 3. BREAKING NEWS */}
      <section id="breaking-news" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" data-testid="section-breaking">
        <SectionHeading icon={Zap} kicker="Just In" title="Breaking News" href="/news?tag=breaking" />
        {breakingNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {breakingNews.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <EmptyBlock label="breaking" />
        )}
      </section>

      {/* 4. LATEST / CURRENT NEWS */}
      <section id="current-news" className="scroll-mt-24 bg-muted/40 py-10" data-testid="section-current">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading icon={Clock} kicker="Right Now" title="Current News" href="/news" />
          {latestNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestNews.slice(0, 6).map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <EmptyBlock label="current" />
          )}
        </div>
      </section>

      {/* 5. TRENDING NEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" data-testid="section-trending">
        <SectionHeading icon={TrendingUp} kicker="Popular" title="Trending Now" accent="secondary" href="/news?trending=true" />
        {trendingNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingNews.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <EmptyBlock label="trending" />
        )}
      </section>

      {/* 6. NEWS BY CATEGORIES */}
      <section id="categories" className="scroll-mt-24 bg-white border-y border-border py-10" data-testid="section-categories">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading icon={Grid3x3} kicker="Explore" title="News by Categories" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/news?category=${cat.slug}`}
                className="group relative overflow-hidden border-2 border-border rounded-lg p-4 text-center hover:border-primary hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 bg-white"
                data-testid={`category-${cat.slug}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-secondary/0 group-hover:from-primary/10 group-hover:to-secondary/10 transition-colors duration-300"></div>
                <span className="relative font-bold text-sm group-hover:text-primary transition-colors duration-200">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. VIDEO SECTION */}
      {videoNews.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" data-testid="section-videos">
          <SectionHeading icon={PlayCircle} kicker="Watch" title="Video News" accent="secondary" href="/news" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoNews.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
          <div className="text-center mt-8">
            <a
              href="https://youtube.com/@LIVEPOINTNews-c6o"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-colors duration-200"
              data-testid="youtube-channel-link"
            >
              <PlayCircle size={20} /> Subscribe on YouTube
            </a>
          </div>
        </section>
      )}

      {/* 8. OUR PARTNERS */}
      <section className="relative overflow-hidden royal-blue-gradient py-16" data-testid="section-partners">
        <div className="absolute inset-0 world-map-bg opacity-20"></div>
        <div className="absolute inset-0 network-dots"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10">
            <div className="h-1 w-20 bg-gradient-to-r from-primary via-white to-primary mx-auto mb-3"></div>
            <span className="text-primary uppercase tracking-[0.3em] text-xs font-black">Our Trusted Team</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black playfair text-white text-shadow-premium mt-2">Our Partners</h2>
            <p className="text-white/70 max-w-2xl mx-auto mt-3">Meet the professionals behind Live Point News</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {[
              { name: 'Sunil Sharma', photo: 'https://customer-assets-jai6qajn.emergentagent.net/job_himachal-breaking/artifacts/z5cgusm0_IMG-20260718-WA0042.jpg' },
              { name: 'Sunil Grover', photo: 'https://customer-assets-jai6qajn.emergentagent.net/job_himachal-breaking/artifacts/9o2522s7_IMG-20260718-WA0043.jpg' },
              { name: 'Dinesh Hetta', photo: 'https://customer-assets-jai6qajn.emergentagent.net/job_himachal-breaking/artifacts/bacs9rgj_IMG-20260718-WA0044.jpg' },
              { name: 'Rakesh Verma', photo: 'https://customer-assets-jai6qajn.emergentagent.net/job_himachal-breaking/artifacts/9mz7y5zh_IMG-20260718-WA0045.jpg' },
              { name: 'Anil Kanwar', photo: 'https://customer-assets-jai6qajn.emergentagent.net/job_himachal-breaking/artifacts/q20vtxn8_IMG-20260718-WA0046.jpg' },
              { name: 'Jaivardhan Singh', photo: 'https://customer-assets-jai6qajn.emergentagent.net/job_himachal-breaking/artifacts/q8ekhe40_IMG-20260718-WA0047.jpg' },
            ].map((partner, i) => (
              <div key={i} className="group text-center" data-testid={`partner-${i}`}>
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full overflow-hidden ring-4 ring-primary shadow-xl mb-3">
                  <img src={partner.photo} alt={partner.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="text-sm sm:text-base font-bold playfair text-white">{partner.name}</h3>
                <span className="text-[10px] uppercase tracking-widest text-white/60 font-bold">Partner</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. OUR SENIOR REPORTERS */}
      <section className="bg-white py-14" data-testid="section-senior-reporters">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="h-1 w-20 bg-gradient-to-r from-primary via-secondary to-primary mx-auto mb-3"></div>
            <span className="text-primary uppercase tracking-[0.3em] text-xs font-black">Leadership Coverage</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black playfair mt-2">
              Our <span className="gradient-text">Senior Reporters</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: 'Sunil Grover', photo: 'https://customer-assets-jai6qajn.emergentagent.net/job_himachal-breaking/artifacts/9o2522s7_IMG-20260718-WA0043.jpg' },
              { name: 'Anil Kanwar', photo: 'https://customer-assets-jai6qajn.emergentagent.net/job_himachal-breaking/artifacts/q20vtxn8_IMG-20260718-WA0046.jpg' },
              { name: 'Saurabh Chauhan', photo: 'https://customer-assets-jai6qajn.emergentagent.net/job_himachal-breaking/artifacts/lszj937m_1784402281209.png' },
            ].map((reporter, i) => (
              <div key={i} className="group bg-white border-2 border-border rounded-lg overflow-hidden hover:border-primary transition-all duration-300 shadow-lg" data-testid={`senior-reporter-${i}`}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={reporter.photo} alt={reporter.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span className="text-[10px] uppercase tracking-widest text-white font-bold">Senior Reporter</span>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-bold playfair group-hover:text-primary transition-colors duration-300">{reporter.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">Live Point News</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. OUR JUNIOR REPORTERS */}
      <section className="bg-muted/40 py-14" data-testid="section-junior-reporters">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="h-1 w-20 bg-gradient-to-r from-secondary via-primary to-secondary mx-auto mb-3"></div>
            <span className="text-secondary uppercase tracking-[0.3em] text-xs font-black">On The Ground</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black playfair mt-2">
              Our <span className="gradient-text">Junior Reporters</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Priety', photo: 'https://customer-assets-jai6qajn.emergentagent.net/job_himachal-breaking/artifacts/g0k33ywn_IMG-20260718-WA0036.jpg' },
              { name: 'Kapil Thakur', photo: 'https://customer-assets-jai6qajn.emergentagent.net/job_himachal-breaking/artifacts/m7h353fv_IMG-20260718-WA0048.jpg' },
              { name: 'Sunil Sharma', photo: 'https://customer-assets-jai6qajn.emergentagent.net/job_himachal-breaking/artifacts/z5cgusm0_IMG-20260718-WA0042.jpg' },
              { name: 'Rakesh Verma', photo: 'https://customer-assets-jai6qajn.emergentagent.net/job_himachal-breaking/artifacts/9mz7y5zh_IMG-20260718-WA0045.jpg' },
            ].map((reporter, i) => (
              <div key={i} className="group bg-white border-2 border-border rounded-lg overflow-hidden hover:border-primary transition-all duration-300 shadow-md" data-testid={`junior-reporter-${i}`}>
                <div className="relative aspect-square overflow-hidden">
                  <img src={reporter.photo} alt={reporter.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                    <span className="text-[9px] uppercase tracking-widest text-white font-bold">Reporter</span>
                  </div>
                </div>
                <div className="p-3 text-center">
                  <h3 className="text-sm font-bold playfair group-hover:text-primary transition-colors duration-300">{reporter.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup (just above footer) */}
      <section className="bg-foreground text-white py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Mail size={40} className="mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold playfair mb-3" data-testid="newsletter-heading">Get Instant Local Alerts</h2>
          <p className="text-gray-300 mb-6">Subscribe for daily Himachal updates delivered straight to your inbox</p>
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

      <Footer />
    </div>
  );
};

export default HomePage;
