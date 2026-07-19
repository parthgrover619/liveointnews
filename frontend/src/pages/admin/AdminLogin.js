import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LogIn } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API}/auth/login`, { email, password });
      localStorage.setItem('adminToken', response.data.token);
      localStorage.setItem('adminUser', JSON.stringify(response.data.user));
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black playfair text-primary mb-2">Live Point News</h1>
          <p className="text-muted-foreground">Admin Dashboard</p>
        </div>

        <div className="bg-white border border-border p-8 rounded-lg shadow-lg">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-primary/10 text-primary rounded-full">
              <LogIn size={32} />
            </div>
          </div>

          <h2 className="text-2xl font-bold playfair text-center mb-6" data-testid="admin-login-title">
            Admin Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="admin@livepoint.in"
                data-testid="admin-email-input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="••••••••"
                data-testid="admin-password-input"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded" data-testid="admin-login-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-primary text-primary-foreground font-semibold rounded hover:bg-primary/90 disabled:opacity-50 transition-colors duration-200"
              data-testid="admin-login-submit"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;