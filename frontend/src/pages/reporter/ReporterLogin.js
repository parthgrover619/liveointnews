import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { LogIn, User } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ReporterLogin = () => {
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
      const response = await axios.post(`${API}/auth/reporter/login`, { email, password });
      localStorage.setItem('reporterToken', response.data.token);
      localStorage.setItem('reporterUser', JSON.stringify(response.data.user));
      navigate('/reporter/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen royal-blue-gradient flex items-center justify-center px-4 relative">
      <div className="absolute inset-0 world-map-bg opacity-30"></div>
      <div className="absolute inset-0 network-dots"></div>
      
      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-8">
          <img 
            src="https://customer-assets.emergentagent.com/job_himachal-breaking/artifacts/vxbtuj6d_1784024059432.png" 
            alt="Live Point News"
            className="w-20 h-20 object-contain mx-auto mb-4 drop-shadow-2xl"
          />
          <h1 className="text-3xl font-black playfair text-white mb-2">Live Point News</h1>
          <p className="text-white/80">Reporter Portal</p>
        </div>

        <div className="bg-white border border-white/30 p-8 rounded-lg shadow-2xl">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-primary rounded-full">
              <User size={32} className="text-white" />
            </div>
          </div>

          <h2 className="text-2xl font-bold playfair text-center mb-6" data-testid="reporter-login-title">
            Reporter Login
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
                placeholder="reporter@livepointnews.com"
                data-testid="reporter-email-input"
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
                data-testid="reporter-password-input"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded" data-testid="reporter-login-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded hover:shadow-2xl transform hover:scale-105 disabled:opacity-50 transition-all duration-300 flex items-center justify-center space-x-2"
              data-testid="reporter-login-submit"
            >
              <LogIn size={20} />
              <span>{loading ? 'Logging in...' : 'Login'}</span>
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Are you an admin? <Link to="/admin/login" className="text-primary font-semibold hover:underline">Admin Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReporterLogin;
