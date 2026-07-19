import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReporterLayout from '@/components/ReporterLayout';
import { User, Mail, Phone, MapPin, IdCard, Edit, Save, X, Shield } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ReporterProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('reporterToken');
    if (!token) {
      navigate('/reporter/login');
      return;
    }
    fetchProfile();
  }, [navigate]);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('reporterToken');
      const response = await axios.get(`${API}/reporter/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(response.data);
      setFormData({
        name: response.data.name,
        phone: response.data.phone,
        district: response.data.district || '',
        address: response.data.address || '',
        photo: response.data.photo || '',
      });
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        navigate('/reporter/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const token = localStorage.getItem('reporterToken');
      await axios.put(`${API}/reporter/profile`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Profile updated successfully!');
      setEditing(false);
      fetchProfile();
    } catch (error) {
      setMessage('Failed to update profile');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) return <ReporterLayout title="My Profile"><p>Loading...</p></ReporterLayout>;
  if (!profile) return null;

  return (
    <ReporterLayout title="My Profile">
      {message && (
        <div className={`p-4 rounded-lg mb-6 ${message.includes('success') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {message}
        </div>
      )}

      <div className="bg-white border border-border rounded-lg p-8 shadow-lg">
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center space-x-6">
            {profile.photo ? (
              <img src={profile.photo} alt={profile.name}
                className="w-24 h-24 rounded-full object-cover ring-4 ring-primary" />
            ) : (
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center ring-4 ring-primary">
                <span className="text-4xl font-black text-white">{profile.name.charAt(0)}</span>
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold playfair">{profile.name}</h2>
              <div className="flex items-center space-x-2 mt-1">
                <Shield size={14} className="text-primary" />
                <span className="text-sm text-primary font-semibold capitalize">{profile.role}</span>
              </div>
              <p className="text-sm text-muted-foreground">Since {formatDate(profile.created_at)}</p>
            </div>
          </div>

          {!editing ? (
            <button onClick={() => setEditing(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors">
              <Edit size={18} />
              <span>Edit</span>
            </button>
          ) : (
            <button onClick={() => { setEditing(false); setMessage(''); }}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors">
              <X size={18} />
              <span>Cancel</span>
            </button>
          )}
        </div>

        {editing ? (
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input type="text" value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required className="w-full px-4 py-2 border border-border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input type="tel" value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required className="w-full px-4 py-2 border border-border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">District</label>
                <input type="text" value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Photo URL</label>
                <input type="url" value={formData.photo}
                  onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full px-4 py-2 border border-border rounded" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Address</label>
                <textarea value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows={3} className="w-full px-4 py-2 border border-border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">New Password (optional)</label>
                <input type="password" value={formData.password || ''}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Leave empty to keep current"
                  className="w-full px-4 py-2 border border-border rounded" />
              </div>
            </div>
            <button type="submit"
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded hover:shadow-lg transition-all duration-300">
              <Save size={18} />
              <span>Save Changes</span>
            </button>
          </form>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileField icon={User} label="Full Name" value={profile.name} />
            <ProfileField icon={Mail} label="Email" value={profile.email} />
            <ProfileField icon={Phone} label="Phone" value={profile.phone} />
            <ProfileField icon={MapPin} label="District" value={profile.district || 'Not specified'} />
            {profile.id_number && <ProfileField icon={IdCard} label="Reporter ID" value={profile.id_number} />}
            {profile.address && <ProfileField icon={MapPin} label="Address" value={profile.address} fullWidth />}
          </div>
        )}
      </div>

      <div className="mt-6 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-6">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Privacy Notice:</strong> You can only view and edit your own personal information. 
          Contact your administrator for additional access or Reporter ID changes.
        </p>
      </div>
    </ReporterLayout>
  );
};

const ProfileField = ({ icon: Icon, label, value, fullWidth = false }) => (
  <div className={`flex items-start space-x-3 ${fullWidth ? 'md:col-span-2' : ''}`}>
    <div className="p-2 bg-primary/10 rounded">
      <Icon size={20} className="text-primary" />
    </div>
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  </div>
);

export default ReporterProfile;
