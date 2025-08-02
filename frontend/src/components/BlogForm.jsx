import { useState } from 'react';
import { toast } from 'react-toastify';

function BlogForm({ onSubmit, initialData = {}, isEdit = false }) {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    content: initialData.content || '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      await onSubmit(formData);
      toast.success(`Blog ${isEdit ? 'updated' : 'created'} successfully!`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Enter blog title"
        />
      </div>
      <div>
        <label className="block text-gray-700">Content</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows="6"
          placeholder="Enter blog content"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
      >
        {loading ? 'Submitting...' : isEdit ? 'Update Blog' : 'Create Blog'}
      </button>
    </form>
  );
}

export default BlogForm;