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
    <div className="min-h-screen relative">
      <div className="logo-watermark"></div>
      <Header />

      {/* Brand Banner - TV News Style */}
      <section
        className="relative overflow-hidden royal-blue-gradient py-10 sm:py-14 border-b-4 border-primary"
        data-testid="brand-banner"
      >
        {/* Background layers */}
        <div className="absolute inset-0 world-map-bg opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>

        {/* Diagonal red accent stripe */}
        <div className="absolute -top-10 -right-20 w-96 h-96 bg-primary/20 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-10 -left-20 w-96 h-96 bg-secondary/20 blur-3xl rounded-full"></div>

        {/* Animated shine sweep */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="banner-shine"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-6 md:gap-10 animate-fadeInUp">
            {/* LEFT: Logo + Brand Wordmark */}
            <div className="flex items-center gap-5 sm:gap-6">
              <div className="relative shrink-0">
                <div className="absolute inset-0 bg-primary/40 blur-2xl rounded-full animate-pulse-glow"></div>
                <img
                  src="https://customer-assets.emergentagent.com/job_himachal-breaking/artifacts/vxbtuj6d_1784024059432.png"
                  alt="Live Point News"
                  className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 object-contain drop-shadow-2xl"
                />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex items-center gap-1.5 bg-primary text-white text-[10px] sm:text-xs font-black uppercase tracking-widest px-2.5 py-1 rounded-sm shadow-lg">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                    Live
                  </span>
                  <span className="text-white/70 text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em]">
                    Himachal Pradesh
                  </span>
                </div>
                <h1
                  className="text-3xl sm:text-5xl lg:text-6xl font-black playfair leading-none text-white text-shadow-premium tracking-tight"
                  data-testid="hero-title"
                >
                  LIVE POINT <span className="text-primary">NEWS</span>
                </h1>
                <div className="flex items-center gap-3 mt-2">
                  <div className="h-0.5 w-8 bg-primary"></div>
                  <p className="text-white/90 font-semibold text-sm sm:text-base tracking-wide">
                    Breaking News, First &amp; Fast
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT: Trust badges */}
            <div className="hidden md:flex flex-col gap-2 border-l-2 border-white/20 pl-6">
              {[
                { label: 'Verified' },
                { label: 'Unbiased' },
                { label: 'Real-Time' },
              ].map((b) => (
                <div key={b.label} className="flex items-center gap-2 text-white">
                  <CheckCircle size={18} className="text-primary" />
                  <span className="font-bold text-sm tracking-wide">{b.label}</span>
                </div>
              ))}
            </div>

            {/* Mobile trust badges */}
            <div className="flex md:hidden items-center justify-center gap-4 text-white/90">
              {['Verified', 'Unbiased', 'Real-Time'].map((label) => (
                <div key={label} className="flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-primary" />
                  <span className="font-bold text-xs">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured News Section */}
      {featuredNews.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-20">
          <NewsCard article={featuredNews[0]} featured={true} />
        </section>
      )}

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

      {/* Partners Section */}
      <section className="relative overflow-hidden royal-blue-gradient py-16">
        <div className="absolute inset-0 world-map-bg opacity-20"></div>
        <div className="absolute inset-0 network-dots"></div>
        <div className="absolute top-10 right-10 compass-decoration"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <div className="h-1 w-20 bg-gradient-to-r from-primary via-white to-primary mx-auto mb-4"></div>
              <span className="text-primary uppercase tracking-[0.3em] text-sm font-black">Our Trusted Team</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black playfair text-white text-shadow-premium mb-4">
              Our Partners
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Meet the dedicated professionals behind Live Point News, committed to delivering trusted journalism across Himachal Pradesh
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Sunil Sharma', photo: 'https://customer-assets-jai6qajn.emergentagent.net/job_himachal-breaking/artifacts/z5cgusm0_IMG-20260718-WA0042.jpg' },
              { name: 'Sunil Grover', photo: 'https://customer-assets-jai6qajn.emergentagent.net/job_himachal-breaking/artifacts/9o2522s7_IMG-20260718-WA0043.jpg' },
              { name: 'Dinesh Hetta', photo: 'https://customer-assets-jai6qajn.emergentagent.net/job_himachal-breaking/artifacts/bacs9rgj_IMG-20260718-WA0044.jpg' },
              { name: 'Rakesh Verma', photo: 'https://customer-assets-jai6qajn.emergentagent.net/job_himachal-breaking/artifacts/9mz7y5zh_IMG-20260718-WA0045.jpg' },
              { name: 'Anil Kanwar', photo: 'https://customer-assets-jai6qajn.emergentagent.net/job_himachal-breaking/artifacts/q20vtxn8_IMG-20260718-WA0046.jpg' },
              { name: 'Jaivardhan Singh', photo: 'https://customer-assets-jai6qajn.emergentagent.net/job_himachal-breaking/artifacts/q8ekhe40_IMG-20260718-WA0047.jpg' }
            ].map((partner, index) => (
              <div
                key={index}
                className="group relative perspective-container animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
                data-testid={`partner-${index}`}
              >
                <div className="card-3d bg-white/95 backdrop-blur-sm border-2 border-white/20 rounded-lg p-8 hover:border-primary transition-all duration-300 shadow-2xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl"></div>
                  
                  <div className="relative z-10 text-center">
                    <div className="relative inline-block mb-4">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary blur-xl opacity-50 animate-pulse-glow"></div>
                      {partner.photo ? (
                        <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden ring-4 ring-primary shadow-2xl">
                          <img 
                            src={partner.photo} 
                            alt={partner.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      ) : (
                        <div className="relative w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-2xl ring-4 ring-primary">
                          <span className="text-5xl font-black text-white playfair">
                            {partner.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold playfair mb-2 group-hover:gradient-text transition-all duration-300">
                      {partner.name}
                    </h3>
                    
                    <div className="flex items-center justify-center space-x-2 mt-3">
                      <div className="h-0.5 w-8 bg-primary"></div>
                      <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Partner</span>
                      <div className="h-0.5 w-8 bg-primary"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center space-x-4 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
              <span className="text-white font-medium">Together, delivering trusted news to Himachal Pradesh</span>
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Reporters Section - Two Panels */}
      <section className="relative overflow-hidden py-16 bg-white">
        <div className="absolute inset-0 hero-pattern opacity-40"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Senior Reporters Panel */}
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <div className="h-1 w-20 bg-gradient-to-r from-primary via-secondary to-primary mx-auto mb-4"></div>
              <span className="text-primary uppercase tracking-[0.3em] text-sm font-black">Leadership Coverage</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black playfair mb-4">
              Our <span className="gradient-text">Senior Reporters</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experienced senior journalists delivering trusted news across Himachal Pradesh
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
            {[
              { name: 'Sunil Grover', photo: 'https://customer-assets-jai6qajn.emergentagent.net/job_himachal-breaking/artifacts/9o2522s7_IMG-20260718-WA0043.jpg' },
              { name: 'Anil Kanwar', photo: 'https://customer-assets-jai6qajn.emergentagent.net/job_himachal-breaking/artifacts/q20vtxn8_IMG-20260718-WA0046.jpg' },
              { name: 'Saurabh Chauhan', photo: 'https://customer-assets-jai6qajn.emergentagent.net/job_himachal-breaking/artifacts/lszj937m_1784402281209.png' },
            ].map((reporter, index) => (
              <div
                key={index}
                className="group relative perspective-container animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
                data-testid={`senior-reporter-${index}`}
              >
                <div className="card-3d bg-white border-2 border-border rounded-lg overflow-hidden hover:border-primary transition-all duration-300 shadow-xl">
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
                    <img 
                      src={reporter.photo} 
                      alt={reporter.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        <span className="text-xs uppercase tracking-widest text-white font-bold">Senior Reporter</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-bold playfair group-hover:text-primary transition-colors duration-300">
                      {reporter.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">Live Point News</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center my-12">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-primary"></div>
            <div className="mx-4 w-3 h-3 bg-primary rounded-full animate-pulse"></div>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-primary"></div>
          </div>

          {/* Reporters Panel */}
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <div className="h-1 w-20 bg-gradient-to-r from-secondary via-primary to-secondary mx-auto mb-4"></div>
              <span className="text-secondary uppercase tracking-[0.3em] text-sm font-black">On The Ground</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black playfair mb-4">
              Our <span className="gradient-text">Reporters</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Dedicated field reporters covering local stories with passion and precision
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Priety', photo: 'https://customer-assets-jai6qajn.emergentagent.net/job_himachal-breaking/artifacts/g0k33ywn_IMG-20260718-WA0036.jpg' },
              { name: 'Kapil Thakur', photo: 'https://customer-assets-jai6qajn.emergentagent.net/job_himachal-breaking/artifacts/m7h353fv_IMG-20260718-WA0048.jpg' },
              { name: 'Sunil Sharma', photo: 'https://customer-assets-jai6qajn.emergentagent.net/job_himachal-breaking/artifacts/z5cgusm0_IMG-20260718-WA0042.jpg' },
              { name: 'Rakesh Verma', photo: 'https://customer-assets-jai6qajn.emergentagent.net/job_himachal-breaking/artifacts/9mz7y5zh_IMG-20260718-WA0045.jpg' },
            ].map((reporter, index) => (
              <div
                key={index}
                className="group relative perspective-container animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
                data-testid={`reporter-${index}`}
              >
                <div className="card-3d bg-white border-2 border-border rounded-lg overflow-hidden hover:border-primary transition-all duration-300 shadow-xl">
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
                    <img 
                      src={reporter.photo} 
                      alt={reporter.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                        <span className="text-xs uppercase tracking-widest text-white font-bold">Reporter</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-bold playfair group-hover:text-primary transition-colors duration-300">
                      {reporter.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">Live Point News</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <a 
          href="https://youtube.com/@LIVEPOINTNews-c6o" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block bg-gradient-to-r from-primary/10 to-secondary/10 border border-border p-8 text-center hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300"
          data-testid="youtube-channel-link"
        >
          <svg className="w-16 h-16 mx-auto mb-4 text-primary fill-current" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          <h2 className="text-2xl sm:text-3xl font-bold playfair mb-4">Watch Us on YouTube</h2>
          <p className="text-muted-foreground mb-6">Subscribe to our YouTube channel for video news coverage from Himachal Pradesh</p>
          <span className="inline-flex items-center space-x-2 px-8 py-3 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 transition-colors duration-200">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span>Subscribe on YouTube</span>
          </span>
          <p className="text-sm text-muted-foreground mt-4">@LIVEPOINTNews-c6o</p>
        </a>
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
