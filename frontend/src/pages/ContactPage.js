import React, { useState } from 'react';
import axios from 'axios';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ContactPage = () => {
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [tipForm, setTipForm] = useState({ name: '', email: '', phone: '', message: '', tip_category: 'general' });
  const [contactLoading, setContactLoading] = useState(false);
  const [tipLoading, setTipLoading] = useState(false);
  const [contactMessage, setContactMessage] = useState('');
  const [tipMessage, setTipMessage] = useState('');

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactLoading(true);
    setContactMessage('');

    try {
      await axios.post(`${API}/contact`, contactForm);
      setContactMessage('Message sent successfully! We\'ll get back to you soon.');
      setContactForm({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setContactMessage('Failed to send message. Please try again.');
    } finally {
      setContactLoading(false);
    }
  };

  const handleTipSubmit = async (e) => {
    e.preventDefault();
    setTipLoading(true);
    setTipMessage('');

    try {
      await axios.post(`${API}/news-tips`, tipForm);
      setTipMessage('News tip submitted successfully! Our team will review it.');
      setTipForm({ name: '', email: '', phone: '', message: '', tip_category: 'general' });
    } catch (error) {
      setTipMessage('Failed to submit tip. Please try again.');
    } finally {
      setTipLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl sm:text-5xl font-black playfair tracking-tight leading-none mb-8" data-testid="contact-title">
          Contact Us
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold playfair mb-6">Get in Touch</h2>
            <p className="text-muted-foreground mb-8">
              Have a question, feedback, or want to reach our editorial team? We'd love to hear from you.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary/10 text-primary rounded">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <a href="mailto:livepointnewstheog@gmail.com" className="text-muted-foreground hover:text-primary">
                    livepointnewstheog@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary/10 text-primary rounded">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Location</h3>
                  <p className="text-muted-foreground">Shop No 14, New Bus Stand<br />Theog, Shimla<br />Himachal Pradesh, India</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="mt-8 rounded overflow-hidden border border-border">
              <iframe
                title="Live Point News Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54624.89697937634!2d77.38429!3d31.1048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390578e3e8e4e3e3%3A0x1!2sTheog%2C%20Himachal%20Pradesh!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-white border border-border p-8">
              <h2 className="text-2xl font-bold playfair mb-6">Send Us a Message</h2>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name *</label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    data-testid="contact-name-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    data-testid="contact-email-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    data-testid="contact-phone-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message *</label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    data-testid="contact-message-input"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={contactLoading}
                  className="w-full px-6 py-3 bg-primary text-primary-foreground font-semibold rounded hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center space-x-2 transition-colors duration-200"
                  data-testid="contact-submit-button"
                >
                  <span>{contactLoading ? 'Sending...' : 'Send Message'}</span>
                  <Send size={18} />
                </button>

                {contactMessage && (
                  <p className={`text-sm ${contactMessage.includes('success') ? 'text-green-600' : 'text-red-600'}`} data-testid="contact-response-message">
                    {contactMessage}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* News Tip Submission */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-secondary/10 to-primary/10 border border-border p-8">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center space-x-3 mb-6">
                <img
                  src="https://images.unsplash.com/photo-1575507479993-7bb702d5e966?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHxqb3VybmFsaXN0JTIwcmVwb3J0aW5nJTIwbmV3c3xlbnwwfHx8fDE3ODQwMzA4NTl8MA&ixlib=rb-4.1.0&q=85"
                  alt="Report News"
                  className="w-16 h-16 rounded object-cover"
                />
                <div>
                  <h2 className="text-2xl font-bold playfair">Report a Story in Your Area</h2>
                  <p className="text-sm text-muted-foreground">Community-powered journalism</p>
                </div>
              </div>

              <form onSubmit={handleTipSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Name *</label>
                    <input
                      type="text"
                      value={tipForm.name}
                      onChange={(e) => setTipForm({ ...tipForm, name: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      data-testid="tip-name-input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      value={tipForm.email}
                      onChange={(e) => setTipForm({ ...tipForm, email: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      data-testid="tip-email-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone *</label>
                    <input
                      type="tel"
                      value={tipForm.phone}
                      onChange={(e) => setTipForm({ ...tipForm, phone: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      data-testid="tip-phone-input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Category *</label>
                    <select
                      value={tipForm.tip_category}
                      onChange={(e) => setTipForm({ ...tipForm, tip_category: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      data-testid="tip-category-select"
                    >
                      <option value="general">General News</option>
                      <option value="breaking">Breaking News</option>
                      <option value="politics">Politics</option>
                      <option value="crime">Crime</option>
                      <option value="community">Community Event</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">News Tip / Story Details *</label>
                  <textarea
                    value={tipForm.message}
                    onChange={(e) => setTipForm({ ...tipForm, message: e.target.value })}
                    required
                    rows={5}
                    placeholder="Please provide as much detail as possible about the news story..."
                    className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    data-testid="tip-message-input"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={tipLoading}
                  className="w-full px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded hover:bg-secondary/90 disabled:opacity-50 transition-colors duration-200"
                  data-testid="tip-submit-button"
                >
                  {tipLoading ? 'Submitting...' : 'Submit News Tip'}
                </button>

                {tipMessage && (
                  <p className={`text-sm ${tipMessage.includes('success') ? 'text-green-600' : 'text-red-600'}`} data-testid="tip-response-message">
                    {tipMessage}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;