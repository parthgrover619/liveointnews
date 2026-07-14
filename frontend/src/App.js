import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@/App.css';

// Public pages
import HomePage from '@/pages/HomePage';
import NewsPage from '@/pages/NewsPage';
import NewsDetailPage from '@/pages/NewsDetailPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import TestimonialsPage from '@/pages/TestimonialsPage';
import AdvertisePage from '@/pages/AdvertisePage';
import PrivacyPage from '@/pages/PrivacyPage';
import TermsPage from '@/pages/TermsPage';

// Admin pages
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminNews from '@/pages/admin/AdminNews';
import AdminNewsTips from '@/pages/admin/AdminNewsTips';
import AdminSubscribers from '@/pages/admin/AdminSubscribers';
import AdminContacts from '@/pages/admin/AdminContacts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:id" element={<NewsDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/advertise" element={<AdvertisePage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        
        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/news" element={<AdminNews />} />
        <Route path="/admin/tips" element={<AdminNewsTips />} />
        <Route path="/admin/subscribers" element={<AdminSubscribers />} />
        <Route path="/admin/contacts" element={<AdminContacts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
