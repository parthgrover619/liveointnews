import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminLayout from '@/components/AdminLayout';
import { Key, Save, Shield, AlertCircle } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminSettings = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('adminUser') || '{}');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage('');

    if (newPassword.length < 6) {
      setMessage('New password must be at least 6 characters');
      setMessageType('error');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('New password and confirmation do not match');
      setMessageType('error');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(
        `${API}/admin/change-password`,
        { current_password: currentPassword, new_password: newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Password changed successfully! Please login again with the new password.');
      setMessageType('success');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
      // Force logout after 3 seconds
      setTimeout(() => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/admin/login');
      }, 3000);
    } catch (error) {
      setMessage(error.response?.data?.detail || 'Failed to change password');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Settings">
      <div className="max-w-2xl">
        {/* Profile Info */}
        <div className="bg-white border border-border rounded-lg p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <Shield size={28} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold playfair">{user.name || 'Owner'}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <span className="inline-block mt-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded font-semibold">
                {user.role?.replace('_', ' ').toUpperCase() || 'ADMIN'}
              </span>
            </div>
          </div>
        </div>

        {/* Change Password */}
        <div className="bg-white border border-border rounded-lg p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Key size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold playfair">Change Your Password</h3>
              <p className="text-sm text-muted-foreground">Update your admin login password</p>
            </div>
          </div>

          {message && (
            <div className={`p-4 rounded-lg mb-6 flex items-start space-x-2 ${
              messageType === 'success' 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
              <p className="text-sm">{message}</p>
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Current Password *</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                placeholder="Enter current password"
                className="w-full px-4 py-3 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                data-testid="current-password-input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">New Password *</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
                placeholder="Enter new password (min 6 characters)"
                className="w-full px-4 py-3 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                data-testid="new-password-input"
              />
              <p className="text-xs text-muted-foreground mt-1">Minimum 6 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Confirm New Password *</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                placeholder="Re-enter new password"
                className="w-full px-4 py-3 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                data-testid="confirm-password-input"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded hover:shadow-lg disabled:opacity-50 transition-all duration-300"
              data-testid="change-password-submit"
            >
              <Save size={18} />
              <span>{loading ? 'Changing...' : 'Change Password'}</span>
            </button>
          </form>

          <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center space-x-2">
              <Shield size={16} className="text-primary" />
              <span>Security Tips</span>
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Use a strong password with 8+ characters</li>
              <li>• Include uppercase, lowercase, numbers, and symbols</li>
              <li>• Don't reuse passwords from other websites</li>
              <li>• Save your new password in a secure password manager</li>
              <li>• You will need to login again with new password after change</li>
            </ul>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
