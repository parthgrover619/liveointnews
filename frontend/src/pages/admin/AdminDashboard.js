import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminLayout from '@/components/AdminLayout';
import { Newspaper, FileText, MessageSquare, Users, TrendingUp, Mail } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchStats();
  }, [navigate]);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${API}/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      if (error.response?.status === 401) {
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const statCards = stats ? [
    { icon: Newspaper, label: 'Total Articles', value: stats.total_articles, color: 'text-primary', bg: 'bg-primary/10' },
    { icon: TrendingUp, label: 'Published', value: stats.published_articles, color: 'text-green-600', bg: 'bg-green-100' },
    { icon: FileText, label: 'Drafts', value: stats.draft_articles, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { icon: MessageSquare, label: 'News Tips', value: stats.total_tips, color: 'text-blue-600', bg: 'bg-blue-100' },
    { icon: MessageSquare, label: 'Pending Tips', value: stats.pending_tips, color: 'text-orange-600', bg: 'bg-orange-100' },
    { icon: Users, label: 'Subscribers', value: stats.total_subscribers, color: 'text-purple-600', bg: 'bg-purple-100' },
    { icon: Mail, label: 'Contact Messages', value: stats.total_contacts, color: 'text-secondary', bg: 'bg-secondary/10' },
  ] : [];

  if (loading) {
    return (
      <AdminLayout title="Dashboard">
        <p className="text-muted-foreground">Loading dashboard...</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="dashboard-stats">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="bg-white border border-border p-6 rounded-lg hover:shadow-lg transition-shadow duration-200"
            data-testid={`stat-card-${card.label.toLowerCase().replace(/\s+/g, '-')}`}
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

      <div className="mt-8 bg-white border border-border p-6 rounded-lg">
        <h3 className="text-xl font-bold playfair mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/admin/news"
            className="p-4 border-2 border-primary text-primary text-center rounded hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
            data-testid="quick-action-create-news"
          >
            <Newspaper className="mx-auto mb-2" size={24} />
            <span className="font-semibold">Create News Article</span>
          </a>
          <a
            href="/admin/tips"
            className="p-4 border-2 border-secondary text-secondary text-center rounded hover:bg-secondary hover:text-secondary-foreground transition-colors duration-200"
            data-testid="quick-action-review-tips"
          >
            <MessageSquare className="mx-auto mb-2" size={24} />
            <span className="font-semibold">Review News Tips</span>
          </a>
          <a
            href="/admin/subscribers"
            className="p-4 border-2 border-border text-foreground text-center rounded hover:bg-muted transition-colors duration-200"
            data-testid="quick-action-subscribers"
          >
            <Users className="mx-auto mb-2" size={24} />
            <span className="font-semibold">View Subscribers</span>
          </a>
          <a
            href="/admin/contacts"
            className="p-4 border-2 border-border text-foreground text-center rounded hover:bg-muted transition-colors duration-200"
            data-testid="quick-action-contacts"
          >
            <Mail className="mx-auto mb-2" size={24} />
            <span className="font-semibold">Contact Messages</span>
          </a>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
