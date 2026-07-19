import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReporterLayout from '@/components/ReporterLayout';
import { Newspaper, FileText, TrendingUp, Plus } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ReporterDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('reporterToken');
    if (!token) {
      navigate('/reporter/login');
      return;
    }
    fetchStats();
  }, [navigate]);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('reporterToken');
      const response = await axios.get(`${API}/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/reporter/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const user = JSON.parse(localStorage.getItem('reporterUser') || '{}');

  const statCards = stats ? [
    { icon: Newspaper, label: 'My Articles', value: stats.total_articles, color: 'text-primary', bg: 'bg-primary/10' },
    { icon: TrendingUp, label: 'Published', value: stats.published_articles, color: 'text-green-600', bg: 'bg-green-100' },
    { icon: FileText, label: 'Drafts', value: stats.draft_articles, color: 'text-yellow-600', bg: 'bg-yellow-100' },
  ] : [];

  return (
    <ReporterLayout title={`Welcome, ${user.name || 'Reporter'}`}>
      {loading ? (
        <p className="text-muted-foreground">Loading dashboard...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-testid="reporter-stats">
            {statCards.map((card, index) => (
              <div
                key={index}
                className="bg-white border border-border p-6 rounded-lg hover:shadow-lg transition-shadow duration-200"
                data-testid={`stat-card-${index}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${card.bg}`}>
                    <card.icon className={card.color} size={24} />
                  </div>
                  <div className={`text-3xl font-black playfair ${card.color}`}>
                    {card.value}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground font-medium">{card.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href="/reporter/news"
              className="p-8 bg-gradient-to-br from-primary to-secondary text-white rounded-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              data-testid="create-article-cta"
            >
              <Plus size={32} className="mb-3" />
              <h3 className="text-2xl font-bold playfair mb-2">Create New Article</h3>
              <p className="text-white/80">Write and publish your latest news story</p>
            </a>

            <a
              href="/reporter/profile"
              className="p-8 bg-white border-2 border-primary text-primary rounded-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              data-testid="view-profile-cta"
            >
              <div className="w-8 h-8 mb-3 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-bold">{user.name?.charAt(0)}</span>
              </div>
              <h3 className="text-2xl font-bold playfair mb-2">My Profile</h3>
              <p className="text-muted-foreground">View and update your personal information</p>
            </a>
          </div>
        </>
      )}
    </ReporterLayout>
  );
};

export default ReporterDashboard;
