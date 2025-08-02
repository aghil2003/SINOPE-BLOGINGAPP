import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BlogForm from '../components/BlogForm';
import { createBlog, getBlogById, updateBlog } from '../services/api';

function CreateEditBlog() {
  const { id } = useParams();
  const [initialData, setInitialData] = useState({});
  const [loading, setLoading] = useState(!!id);
  const navigate = useNavigate();
  const isEdit = !!id;

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        try {
          const res = await getBlogById(id);
          setInitialData(res.data);
          setLoading(false);
        } catch (err) {
          setLoading(false);
        }
      };
      fetchBlog();
    }
  }, [id]);

  const handleSubmit = async (formData) => {
    if (isEdit) {
      await updateBlog(id, formData);
    } else {
      await createBlog(formData);
    }
    navigate('/');
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        {isEdit ? 'Edit Blog' : 'Create Blog'}
      </h1>
      <BlogForm
        onSubmit={handleSubmit}
        initialData={initialData}
        isEdit={isEdit}
      />
    </div>
  );
}

export default CreateEditBlog;