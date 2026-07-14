import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'glass-dark shadow-2xl' : 'glass-dark'}`}>
      {/* Breaking news ticker with waves */}
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

      {/* Main header with logo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between py-4">
          {/* Premium Logo with Image */}
          <Link to="/" className="flex items-center space-x-4 group relative z-10" data-testid="header-logo">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 blur-2xl rounded-full animate-pulse-glow"></div>
              <img 
                src="https://customer-assets.emergentagent.com/job_himachal-breaking/artifacts/vxbtuj6d_1784024059432.png" 
                alt="Live Point News"
                className="relative w-16 h-16 object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="relative">
              <div className="text-2xl font-black playfair text-white text-shadow-premium">
                Live Point News
              </div>
              <div className="text-xs font-bold text-primary tracking-widest">TRUSTED • TIMELY • TRANSPARENT</div>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link to="/" className="text-sm font-black uppercase tracking-widest text-white/90 hover:text-primary transition-all duration-300 relative group" data-testid="nav-home">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/news" className="text-sm font-black uppercase tracking-widest text-white/90 hover:text-primary transition-all duration-300 relative group" data-testid="nav-news">
              All News
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/about" className="text-sm font-black uppercase tracking-widest text-white/90 hover:text-primary transition-all duration-300 relative group" data-testid="nav-about">
              About Us
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/contact" className="text-sm font-black uppercase tracking-widest text-white/90 hover:text-primary transition-all duration-300 relative group" data-testid="nav-contact">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              to="/advertise" 
              className="px-8 py-3 bg-gradient-to-r from-primary via-primary to-secondary text-white font-black rounded-full hover:shadow-2xl transform hover:scale-110 transition-all duration-300 animate-pulse-glow uppercase tracking-wider text-sm" 
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
          <nav className="lg:hidden pb-4 space-y-2 animate-fadeInUp" data-testid="mobile-menu">
            <Link to="/" className="block py-3 px-4 text-sm font-bold text-white hover:bg-white/10 rounded transition-colors duration-200">
              Home
            </Link>
            <Link to="/news" className="block py-3 px-4 text-sm font-bold text-white hover:bg-white/10 rounded transition-colors duration-200">
              All News
            </Link>
            <Link to="/about" className="block py-3 px-4 text-sm font-bold text-white hover:bg-white/10 rounded transition-colors duration-200">
              About Us
            </Link>
            <Link to="/contact" className="block py-3 px-4 text-sm font-bold text-white hover:bg-white/10 rounded transition-colors duration-200">
              Contact
            </Link>
            <Link to="/advertise" className="block py-3 px-4 text-sm font-bold bg-gradient-to-r from-primary to-secondary text-white rounded">
              Advertise
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
