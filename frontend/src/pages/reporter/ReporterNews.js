import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReporterLayout from '@/components/ReporterLayout';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Plus, Edit, Trash2, Eye, X } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ReporterNews = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '', excerpt: '', content: '', category: '', district: '',
    author: '', image: '', video_url: '', status: 'draft',
    featured: false, trending: false, tags: []
  });
  const [tagInput, setTagInput] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('reporterToken');
    if (!token) {
      navigate('/reporter/login');
      return;
    }
    const user = JSON.parse(localStorage.getItem('reporterUser') || '{}');
    setFormData(prev => ({ ...prev, author: user.name || '' }));
    fetchArticles();
    fetchCategories();
  }, [navigate]);

  const fetchArticles = async () => {
    try {
      const token = localStorage.getItem('reporterToken');
      const response = await axios.get(`${API}/admin/news`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setArticles(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    const response = await axios.get(`${API}/categories`);
    setCategories(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('reporterToken');
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
      alert('Failed to save article: ' + (error.response?.data?.detail || 'Unknown error'));
    }
  };

  const handleEdit = (article) => {
    setFormData({
      title: article.title, excerpt: article.excerpt, content: article.content,
      category: article.category, district: article.district || '', author: article.author,
      image: article.image || '', video_url: article.video_url || '', status: article.status,
      featured: article.featured, trending: article.trending, tags: article.tags || []
    });
    setEditingId(article.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this article?')) return;
    try {
      const token = localStorage.getItem('reporterToken');
      await axios.delete(`${API}/admin/news/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchArticles();
    } catch (error) {
      alert('Failed to delete article');
    }
  };

  const resetForm = () => {
    const user = JSON.parse(localStorage.getItem('reporterUser') || '{}');
    setFormData({
      title: '', excerpt: '', content: '', category: '', district: '',
      author: user.name || '', image: '', video_url: '', status: 'draft',
      featured: false, trending: false, tags: []
    });
    setTagInput('');
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tagToRemove) });
  };

  return (
    <ReporterLayout title="Team News Articles">
      {!showForm ? (
        <>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">All team articles - You can create new and edit any article</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded hover:shadow-lg flex items-center space-x-2 transition-all duration-200"
              data-testid="create-news-button"
            >
              <Plus size={20} />
              <span>Create New Article</span>
            </button>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : articles.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-border">
              <p className="text-muted-foreground mb-4">No articles yet. Be the first to create one!</p>
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
              >
                Create First Article
              </button>
            </div>
          ) : (
            <div className="bg-white border border-border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Author</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {articles.map((article) => (
                    <tr key={article.id}>
                      <td className="px-6 py-4">
                        <p className="font-semibold">{article.title}</p>
                        {article.tags && article.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {article.tags.slice(0, 3).map((tag, i) => (
                              <span key={i} className="text-xs bg-secondary/10 text-secondary px-2 py-0.5 rounded">#{tag}</span>
                            ))}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm">{article.author}</td>
                      <td className="px-6 py-4 text-sm">{article.category}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-2 py-1 rounded font-medium ${
                          article.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {article.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          {article.status === 'published' && (
                            <a href={`/news/${article.id}`} target="_blank" rel="noopener noreferrer"
                              className="p-2 text-secondary hover:bg-secondary/10 rounded" title="View">
                              <Eye size={18} />
                            </a>
                          )}
                          <button onClick={() => handleEdit(article)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded" title="Edit">
                            <Edit size={18} />
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
              onClick={() => { setShowForm(false); setEditingId(null); resetForm(); }}
              className="p-2 hover:bg-muted rounded"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Title *</label>
                <input type="text" value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required className="w-full px-4 py-2 border border-border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Category *</label>
                <select value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required className="w-full px-4 py-2 border border-border rounded">
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.slug}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">District</label>
                <input type="text" value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Status *</label>
                <select value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Featured Image URL</label>
                <input type="url" value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Video URL (YouTube/Direct)</label>
                <input type="url" value={formData.video_url}
                  onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Excerpt *</label>
              <textarea value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                required rows={3} className="w-full px-4 py-2 border border-border rounded" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Content *</label>
              <ReactQuill theme="snow" value={formData.content}
                onChange={(value) => setFormData({ ...formData, content: value })}
                className="bg-white" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tags</label>
              <div className="flex space-x-2 mb-2">
                <input type="text" value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                  placeholder="Add a tag and press Enter"
                  className="flex-1 px-4 py-2 border border-border rounded" />
                <button type="button" onClick={addTag}
                  className="px-4 py-2 bg-secondary text-white rounded hover:bg-secondary/90">
                  Add Tag
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, i) => (
                  <span key={i} className="inline-flex items-center space-x-1 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">
                    <span>#{tag}</span>
                    <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-500">
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button type="submit"
                className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded hover:shadow-lg transition-all duration-200">
                {editingId ? 'Update Article' : 'Create Article'}
              </button>
              <button type="button"
                onClick={() => { setShowForm(false); setEditingId(null); resetForm(); }}
                className="px-6 py-3 bg-white border border-border font-semibold rounded hover:bg-muted">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </ReporterLayout>
  );
};

export default ReporterNews;
