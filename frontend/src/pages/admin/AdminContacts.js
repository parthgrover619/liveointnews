import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminLayout from '@/components/AdminLayout';
import { Mail, Phone, Calendar, User } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchContacts();
  }, [navigate]);

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${API}/admin/contacts`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
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
    <AdminLayout title="Contact Messages">
      {loading ? (
        <p className="text-muted-foreground">Loading messages...</p>
      ) : contacts.length === 0 ? (
        <p className="text-muted-foreground">No contact messages yet.</p>
      ) : (
        <div className="space-y-4" data-testid="contacts-list">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-white border border-border rounded-lg p-6"
              data-testid={`contact-${contact.id}`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <User size={16} className="text-muted-foreground" />
                  <span className="font-semibold">{contact.name}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Calendar size={14} />
                  <span>{formatDate(contact.submitted_at)}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Mail size={14} className="text-muted-foreground" />
                  <a href={`mailto:${contact.email}`} className="text-primary hover:underline">
                    {contact.email}
                  </a>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Phone size={14} className="text-muted-foreground" />
                  <a href={`tel:${contact.phone}`} className="text-primary hover:underline">
                    {contact.phone}
                  </a>
                </div>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-sm font-semibold mb-2">Message:</p>
                <p className="text-muted-foreground leading-relaxed">{contact.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminContacts;