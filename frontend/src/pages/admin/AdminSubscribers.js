import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminLayout from '@/components/AdminLayout';
import { Mail, Calendar } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminSubscribers = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchSubscribers();
  }, [navigate]);

  const fetchSubscribers = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${API}/admin/newsletter/subscribers`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSubscribers(response.data);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
    } finally {
      setLoading(false);
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
    <AdminLayout title="Newsletter Subscribers">
      <div className="mb-6">
        <p className="text-muted-foreground">
          Total Subscribers: <strong className="text-primary">{subscribers.length}</strong>
        </p>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading subscribers...</p>
      ) : subscribers.length === 0 ? (
        <p className="text-muted-foreground">No subscribers yet.</p>
      ) : (
        <div className="bg-white border border-border rounded-lg overflow-hidden">
          <table className="w-full" data-testid="subscribers-table">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Subscribed On</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {subscribers.map((subscriber) => (
                <tr key={subscriber.id} data-testid={`subscriber-${subscriber.id}`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Mail size={16} className="text-muted-foreground" />
                      <span>{subscriber.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar size={14} />
                      <span>{formatDate(subscriber.subscribed_at)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded font-medium ${
                      subscriber.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {subscriber.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminSubscribers;