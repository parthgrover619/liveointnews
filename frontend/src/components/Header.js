import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smoothly scroll to a section on the home page. If user is not on home, navigate first.
  const handleSectionClick = (hash) => (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate(`/${hash}`);
      return;
    }
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const navItems = [
    { label: 'Home', to: '/', testId: 'nav-home', type: 'route' },
    { label: 'Live News', hash: '#live-news', testId: 'nav-live', type: 'section' },
    { label: 'Breaking News', hash: '#breaking-news', testId: 'nav-breaking', type: 'section' },
    { label: 'Current News', hash: '#current-news', testId: 'nav-current', type: 'section' },
    { label: 'All News', to: '/news', testId: 'nav-news', type: 'route' },
    { label: 'Categories', hash: '#categories', testId: 'nav-categories', type: 'section' },
    { label: 'Contact', to: '/contact', testId: 'nav-contact', type: 'route' },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'glass-dark shadow-2xl' : 'glass-dark'}`}>
      {/* Breaking news ticker */}
      <div className="relative overflow-hidden royal-blue-gradient py-3 px-4">
        <div className="absolute inset-0 network-dots"></div>
        <div className="absolute inset-0 shimmer-effect opacity-20"></div>
        <div className="signal-lines">
          <div className="signal-line"></div>
          <div className="signal-line"></div>
          <div className="signal-line"></div>
        </div>
        <div className="max-w-7xl mx-auto flex items-center relative z-10">
          <div className="flex items-center space-x-3 mr-4">
            <div className="relative">
              <Zap size={18} className="fill-current text-primary animate-pulse" />
              <div className="absolute inset-0 animate-radar-ping">
                <Zap size={18} className="fill-current text-primary opacity-50" />
              </div>
            </div>
            <span className="text-xs uppercase tracking-[0.3em] font-black text-white">Breaking News</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-bold text-white/90">Latest updates from Himachal Pradesh • Live Point News</p>
          </div>
        </div>
      </div>

      {/* Main header with logo and nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group relative z-10" data-testid="header-logo">
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 blur-2xl rounded-full animate-pulse-glow"></div>
              <img
                src="https://customer-assets.emergentagent.com/job_himachal-breaking/artifacts/vxbtuj6d_1784024059432.png"
                alt="Live Point News"
                className="relative w-14 h-14 object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="relative hidden sm:block">
              <div className="text-xl xl:text-2xl font-black playfair text-white text-shadow-premium leading-tight">
                Live Point News
              </div>
              <div className="text-[10px] font-bold text-primary tracking-widest">TRUSTED • TIMELY • TRANSPARENT</div>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) =>
              item.type === 'route' ? (
                <Link
                  key={item.label}
                  to={item.to}
                  className="px-3 py-2 text-xs xl:text-sm font-black uppercase tracking-widest text-white/90 hover:text-primary transition-all duration-300 relative group"
                  data-testid={item.testId}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={`/${item.hash}`}
                  onClick={handleSectionClick(item.hash)}
                  className="px-3 py-2 text-xs xl:text-sm font-black uppercase tracking-widest text-white/90 hover:text-primary transition-all duration-300 relative group cursor-pointer"
                  data-testid={item.testId}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                </a>
              )
            )}
            <Link
              to="/advertise"
              className="ml-2 px-5 py-2.5 bg-gradient-to-r from-primary via-primary to-secondary text-white font-black rounded-full hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-pulse-glow uppercase tracking-wider text-xs"
              data-testid="nav-advertise"
            >
              Advertise
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200"
            data-testid="mobile-menu-button"
          >
            {mobileMenuOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav className="lg:hidden pb-4 space-y-1 animate-fadeInUp" data-testid="mobile-menu">
            {navItems.map((item) =>
              item.type === 'route' ? (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3 px-4 text-sm font-bold text-white hover:bg-white/10 rounded transition-colors duration-200"
                  data-testid={`m-${item.testId}`}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={`/${item.hash}`}
                  onClick={handleSectionClick(item.hash)}
                  className="block py-3 px-4 text-sm font-bold text-white hover:bg-white/10 rounded transition-colors duration-200"
                  data-testid={`m-${item.testId}`}
                >
                  {item.label}
                </a>
              )
            )}
            <Link
              to="/advertise"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 px-4 text-sm font-bold bg-gradient-to-r from-primary to-secondary text-white rounded text-center"
            >
              Advertise
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
