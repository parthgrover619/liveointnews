import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminLayout from '@/components/AdminLayout';
import { Plus, Trash2, X, User, Mail, Phone, MapPin, Shield } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminReporters = () => {
  const [reporters, setReporters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', phone: '',
    district: '', id_number: '', address: '', photo: '', role: 'reporter'
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchReporters();
  }, [navigate]);

  const fetchReporters = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${API}/admin/reporters`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReporters(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    try {
      await axios.post(`${API}/admin/reporters`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowForm(false);
      resetForm();
      fetchReporters();
    } catch (error) {
      alert('Failed to create reporter: ' + (error.response?.data?.detail || 'Unknown error'));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this reporter?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${API}/admin/reporters/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchReporters();
    } catch (error) {
      alert('Failed to delete');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '', email: '', password: '', phone: '',
      district: '', id_number: '', address: '', photo: '', role: 'reporter'
    });
  };

  const roleColors = {
    super_admin: 'bg-red-100 text-red-700',
    editor: 'bg-blue-100 text-blue-700',
    reporter: 'bg-green-100 text-green-700'
  };

  return (
    <AdminLayout title="Reporters & Users">
      {!showForm ? (
        <>
          <div className="mb-6">
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded hover:shadow-lg flex items-center space-x-2 transition-all duration-200"
              data-testid="create-reporter-button"
            >
              <Plus size={20} />
              <span>Add New User</span>
            </button>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : reporters.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-border">
              <User size={48} className="mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-4">No reporters yet. Add your first user!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reporters.map((reporter) => (
                <div key={reporter.id} className="bg-white border border-border rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-center space-x-4 mb-4">
                    {reporter.photo ? (
                      <img src={reporter.photo} alt={reporter.name}
                        className="w-16 h-16 rounded-full object-cover ring-2 ring-primary" />
                    ) : (
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                        <span className="text-2xl font-black text-white">{reporter.name.charAt(0)}</span>
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-bold playfair">{reporter.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded font-medium ${roleColors[reporter.role] || roleColors.reporter}`}>
                        {reporter.role?.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Mail size={14} />
                      <span>{reporter.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone size={14} />
                      <span>{reporter.phone}</span>
                    </div>
                    {reporter.district && (
                      <div className="flex items-center space-x-2">
                        <MapPin size={14} />
                        <span>{reporter.district}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-border flex justify-end">
                    <button onClick={() => handleDelete(reporter.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="bg-white border border-border rounded-lg p-8 max-w-3xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold playfair">Add New User</h3>
            <button onClick={() => { setShowForm(false); resetForm(); }} className="p-2 hover:bg-muted rounded">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name *</label>
                <input type="text" value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required className="w-full px-4 py-2 border border-border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input type="email" value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required className="w-full px-4 py-2 border border-border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Password *</label>
                <input type="password" value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required minLength={6} className="w-full px-4 py-2 border border-border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone *</label>
                <input type="tel" value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required className="w-full px-4 py-2 border border-border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Role *</label>
                <select value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded">
                  <option value="reporter">Reporter</option>
                  <option value="editor">Editor</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">District</label>
                <input type="text" value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Reporter ID Number</label>
                <input type="text" value={formData.id_number}
                  onChange={(e) => setFormData({ ...formData, id_number: e.target.value })}
                  placeholder="e.g., LPN-2026-001"
                  className="w-full px-4 py-2 border border-border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Photo URL</label>
                <input type="url" value={formData.photo}
                  onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Address</label>
              <textarea value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                rows={2} className="w-full px-4 py-2 border border-border rounded" />
            </div>

            <div className="flex items-center space-x-4">
              <button type="submit"
                className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded hover:shadow-lg transition-all duration-200">
                Create User
              </button>
              <button type="button" onClick={() => { setShowForm(false); resetForm(); }}
                className="px-6 py-3 bg-white border border-border font-semibold rounded hover:bg-muted">
                Cancel
              </button>
            </div>

            <div className="mt-4 p-4 bg-muted rounded text-sm">
              <p className="font-semibold mb-2">Role Descriptions:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li><strong>Reporter:</strong> Can create/edit/delete only their own news articles</li>
                <li><strong>Editor:</strong> Can edit and publish all news articles</li>
                <li><strong>Super Admin:</strong> Full access to everything</li>
              </ul>
            </div>
          </form>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminReporters;
