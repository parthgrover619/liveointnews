import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Home, Newspaper, MessageSquare, Users, Mail, UserCog } from 'lucide-react';

const AdminLayout = ({ children, title }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('adminUser') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/admin', testId: 'nav-dashboard' },
    { icon: Newspaper, label: 'News Articles', path: '/admin/news', testId: 'nav-news' },
    { icon: UserCog, label: 'Reporters & Users', path: '/admin/reporters', testId: 'nav-reporters' },
    { icon: MessageSquare, label: 'News Tips', path: '/admin/tips', testId: 'nav-tips' },
    { icon: Users, label: 'Subscribers', path: '/admin/subscribers', testId: 'nav-subscribers' },
    { icon: Mail, label: 'Contact Messages', path: '/admin/contacts', testId: 'nav-contacts' },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-foreground text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-black playfair">Live Point News</h1>
          <p className="text-sm text-gray-400">Admin Panel</p>
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
          <div className="mb-3">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-gray-400">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-sm hover:text-red-400 transition-colors duration-200"
            data-testid="logout-button"
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

export default AdminLayout;