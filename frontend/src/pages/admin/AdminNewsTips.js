import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminLayout from '@/components/AdminLayout';
import { CheckCircle, X, Clock } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminNewsTips = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchTips();
  }, [navigate]);

  const fetchTips = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${API}/admin/news-tips`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTips(response.data);
    } catch (error) {
      console.error('Error fetching tips:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (tipId, newStatus) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(
        `${API}/admin/news-tips/${tipId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTips();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <AdminLayout title="News Tips">
      {loading ? (
        <p className="text-muted-foreground">Loading news tips...</p>
      ) : tips.length === 0 ? (
        <p className="text-muted-foreground">No news tips submitted yet.</p>
      ) : (
        <div className="space-y-4" data-testid="news-tips-list">
          {tips.map((tip) => (
            <div
              key={tip.id}
              className="bg-white border border-border rounded-lg p-6"
              data-testid={`tip-${tip.id}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-xs uppercase tracking-[0.2em] font-semibold text-primary">
                      {tip.tip_category}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded font-medium ${
                      tip.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : tip.status === 'approved'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {tip.status}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{tip.message}</p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span><strong>Name:</strong> {tip.name}</span>
                    <span><strong>Email:</strong> {tip.email}</span>
                    <span><strong>Phone:</strong> {tip.phone}</span>
                    <span><strong>Submitted:</strong> {formatDate(tip.submitted_at)}</span>
                  </div>
                </div>
              </div>

              {tip.status === 'pending' && (
                <div className="flex items-center space-x-2 pt-4 border-t border-border">
                  <button
                    onClick={() => updateStatus(tip.id, 'approved')}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-200"
                    data-testid={`approve-${tip.id}`}
                  >
                    <CheckCircle size={16} />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => updateStatus(tip.id, 'rejected')}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200"
                    data-testid={`reject-${tip.id}`}
                  >
                    <X size={16} />
                    <span>Reject</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminNewsTips;