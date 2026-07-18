import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminLayout from '@/components/AdminLayout';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Plus, Edit, Trash2, Eye, X } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminNews = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    district: '',
    author: '',
    image: '',
    video_url: '',
    status: 'draft',
    featured: false,
    trending: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchArticles();
    fetchCategories();
  }, [navigate]);

  const fetchArticles = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${API}/admin/news`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API}/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');

    try {
      if (editingId) {
        await axios.put(`${API}/admin/news/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${API}/admin/news`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      
      setShowForm(false);
      setEditingId(null);
      resetForm();
      fetchArticles();
    } catch (error) {
      console.error('Error saving article:', error);
      alert('Failed to save article');
    }
  };

  const handleEdit = (article) => {
    setFormData({
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      category: article.category,
      district: article.district || '',
      author: article.author,
      image: article.image || '',
      video_url: article.video_url || '',
      status: article.status,
      featured: article.featured,
      trending: article.trending,
    });
    setEditingId(article.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${API}/admin/news/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
      alert('Failed to delete article');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      district: '',
      author: '',
      image: '',
      video_url: '',
      status: 'draft',
      featured: false,
      trending: false,
    });
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      ['clean']
    ],
  };

  return (
    <AdminLayout title="News Articles">
      {!showForm ? (
        <>
          <div className="mb-6">
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded hover:bg-primary/90 flex items-center space-x-2 transition-colors duration-200"
              data-testid="create-news-button"
            >
              <Plus size={20} />
              <span>Create New Article</span>
            </button>
          </div>

          {loading ? (
            <p className="text-muted-foreground">Loading articles...</p>
          ) : articles.length === 0 ? (
            <p className="text-muted-foreground">No articles yet. Create your first one!</p>
          ) : (
            <div className="bg-white border border-border rounded-lg overflow-hidden">
              <table className="w-full" data-testid="news-table">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Author</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {articles.map((article) => (
                    <tr key={article.id} data-testid={`news-row-${article.id}`}>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold">{article.title}</p>
                          {article.featured && (
                            <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded mr-1">Featured</span>
                          )}
                          {article.trending && (
                            <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">Trending</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">{article.category}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-2 py-1 rounded font-medium ${
                          article.status === 'published' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {article.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">{article.author}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          {article.status === 'published' && (
                            <a
                              href={`/news/${article.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 text-secondary hover:bg-secondary/10 rounded transition-colors duration-200"
                              data-testid={`view-${article.id}`}
                            >
                              <Eye size={18} />
                            </a>
                          )}
                          <button
                            onClick={() => handleEdit(article)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors duration-200"
                            data-testid={`edit-${article.id}`}
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(article.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors duration-200"
                            data-testid={`delete-${article.id}`}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white border border-border rounded-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold playfair">
              {editingId ? 'Edit Article' : 'Create New Article'}
            </h3>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                resetForm();
              }}
              className="p-2 hover:bg-muted rounded transition-colors duration-200"
              data-testid="close-form-button"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" data-testid="news-form">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  data-testid="news-title-input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Author *</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  data-testid="news-author-input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  data-testid="news-category-select"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.slug}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">District</label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  placeholder="e.g., Shimla, Theog, Kullu"
                  className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  data-testid="news-district-input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Status *</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  data-testid="news-status-select"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  data-testid="news-image-input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Video URL (YouTube or Direct Link)</label>
                <input
                  type="url"
                  value={formData.video_url}
                  onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                  placeholder="https://youtube.com/watch?v=... or https://example.com/video.mp4"
                  className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  data-testid="news-video-input"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Supports YouTube, Vimeo, or direct video links (.mp4, .webm)
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Excerpt *</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                required
                rows={3}
                placeholder="Brief summary of the article (shown in previews)"
                className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                data-testid="news-excerpt-input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Content *</label>
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={(value) => setFormData({ ...formData, content: value })}
                modules={quillModules}
                className="bg-white"
              />
            </div>

            <div className="flex items-center space-x-6">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4"
                  data-testid="news-featured-checkbox"
                />
                <span className="text-sm font-medium">Featured Article</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.trending}
                  onChange={(e) => setFormData({ ...formData, trending: e.target.checked })}
                  className="w-4 h-4"
                  data-testid="news-trending-checkbox"
                />
                <span className="text-sm font-medium">Trending</span>
              </label>
            </div>

            <div className="flex items-center space-x-4">
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded hover:bg-primary/90 transition-colors duration-200"
                data-testid="news-submit-button"
              >
                {editingId ? 'Update Article' : 'Create Article'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  resetForm();
                }}
                className="px-6 py-3 bg-white border border-border font-semibold rounded hover:bg-muted transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminNews;
