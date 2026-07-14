import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    { name: 'Himachal', slug: 'himachal' },
    { name: 'Shimla', slug: 'shimla' },
    { name: 'Theog', slug: 'theog' },
    { name: 'National', slug: 'national' },
    { name: 'Politics', slug: 'politics' },
    { name: 'Business', slug: 'business' },
    { name: 'Sports', slug: 'sports' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-border shadow-sm">
      {/* Breaking news ticker */}
      <div className="bg-primary text-primary-foreground py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold mr-4">Breaking News</span>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm animate-pulse">Latest updates from Himachal Pradesh • Live Point News</p>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3" data-testid="header-logo">
            <div className="text-2xl font-black playfair text-primary">Live Point News</div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors duration-200" data-testid="nav-home">
              Home
            </Link>
            <Link to="/news" className="text-sm font-medium hover:text-primary transition-colors duration-200" data-testid="nav-news">
              All News
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors duration-200" data-testid="nav-about">
              About Us
            </Link>
            <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors duration-200" data-testid="nav-contact">
              Contact
            </Link>
            <Link to="/advertise" className="text-sm font-medium hover:text-primary transition-colors duration-200" data-testid="nav-advertise">
              Advertise
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors duration-200"
            data-testid="mobile-menu-button"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav className="lg:hidden pb-4 space-y-2" data-testid="mobile-menu">
            <Link to="/" className="block py-2 text-sm font-medium hover:text-primary transition-colors duration-200">
              Home
            </Link>
            <Link to="/news" className="block py-2 text-sm font-medium hover:text-primary transition-colors duration-200">
              All News
            </Link>
            <Link to="/about" className="block py-2 text-sm font-medium hover:text-primary transition-colors duration-200">
              About Us
            </Link>
            <Link to="/contact" className="block py-2 text-sm font-medium hover:text-primary transition-colors duration-200">
              Contact
            </Link>
            <Link to="/advertise" className="block py-2 text-sm font-medium hover:text-primary transition-colors duration-200">
              Advertise
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;