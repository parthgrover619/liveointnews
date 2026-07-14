import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-foreground text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold playfair mb-4">Live Point News</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Trusted. Timely. Transparent. Your source for hyperlocal Himachal Pradesh news.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-gray-300 hover:text-white transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-300 hover:text-white transition-colors duration-200">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/advertise" className="text-sm text-gray-300 hover:text-white transition-colors duration-200">
                  Advertise With Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-300 hover:text-white transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-300 hover:text-white transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/news?category=himachal" className="text-sm text-gray-300 hover:text-white transition-colors duration-200">
                  Himachal News
                </Link>
              </li>
              <li>
                <Link to="/news?category=shimla" className="text-sm text-gray-300 hover:text-white transition-colors duration-200">
                  Shimla News
                </Link>
              </li>
              <li>
                <Link to="/news?category=politics" className="text-sm text-gray-300 hover:text-white transition-colors duration-200">
                  Politics
                </Link>
              </li>
              <li>
                <Link to="/news?category=business" className="text-sm text-gray-300 hover:text-white transition-colors duration-200">
                  Business
                </Link>
              </li>
              <li>
                <Link to="/news?category=sports" className="text-sm text-gray-300 hover:text-white transition-colors duration-200">
                  Sports
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-300">Theog, Shimla, Himachal Pradesh</span>
              </li>
              <li className="flex items-start space-x-2">
                <Mail size={16} className="mt-1 flex-shrink-0" />
                <a href="mailto:livepointnewstheog@gmail.com" className="text-sm text-gray-300 hover:text-white transition-colors duration-200">
                  livepointnewstheog@gmail.com
                </a>
              </li>
            </ul>

            {/* Social links */}
            <div className="flex items-center space-x-4 mt-6">
              <a
                href="https://facebook.com/thelivepointnews"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 flex items-center justify-center w-10 h-10"
                data-testid="footer-facebook"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 flex items-center justify-center w-10 h-10"
                data-testid="footer-youtube"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Live Point News. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;