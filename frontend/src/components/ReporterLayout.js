import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Home, Newspaper, User } from 'lucide-react';

const ReporterLayout = ({ children, title }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('reporterUser') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('reporterToken');
    localStorage.removeItem('reporterUser');
    navigate('/reporter/login');
  };

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/reporter/dashboard', testId: 'nav-dashboard' },
    { icon: Newspaper, label: 'News Articles', path: '/reporter/news', testId: 'nav-news' },
    { icon: User, label: 'My Profile', path: '/reporter/profile', testId: 'nav-profile' },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 royal-blue-gradient text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <img 
              src="https://customer-assets.emergentagent.com/job_himachal-breaking/artifacts/vxbtuj6d_1784024059432.png" 
              alt="Live Point News"
              className="w-10 h-10 object-contain"
            />
            <div>
              <h1 className="text-lg font-black playfair">Live Point News</h1>
              <p className="text-xs text-primary font-bold">REPORTER PORTAL</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="flex items-center space-x-3 px-4 py-3 rounded hover:bg-white/10 transition-colors duration-200"
                  data-testid={item.testId}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="mb-3 flex items-center space-x-3">
            {user.photo ? (
              <img src={user.photo} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold">{user.name?.charAt(0)}</span>
              </div>
            )}
            <div>
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-gray-400 capitalize">{user.role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-sm hover:text-primary transition-colors duration-200"
            data-testid="reporter-logout-button"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-border px-8 py-6">
          <h2 className="text-3xl font-bold playfair" data-testid="page-title">{title}</h2>
        </header>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
};

export default ReporterLayout;
