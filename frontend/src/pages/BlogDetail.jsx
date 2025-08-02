  import { useState, useEffect } from 'react';
  import { useParams, useNavigate, Link } from 'react-router-dom';
  import { useSelector } from 'react-redux';
  import { getBlogById, deleteBlog } from '../services/api';
  import { toast } from 'react-toastify';
  import { format } from 'date-fns';

  function BlogDetail() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
      const fetchBlog = async () => {
        try {
          const res = await getBlogById(id);
          setBlog(res.data);
          setLoading(false);
        } catch (err) {
          toast.error('Failed to fetch blog');
          setLoading(false);
        }
      };
      fetchBlog();
    }, [id]);

    const handleDelete = async () => {
  toast((t) => (
    <span className="flex flex-col gap-2">
      <span>Are you sure you want to delete this blog?</span>
      <div className="flex gap-2 justify-end">
        <button
          onClick={async () => {
            toast.dismiss(t.id); 
            try {
              await deleteBlog(id);
              toast.success('Blog deleted successfully!');
              navigate('/');
            } catch (err) {
              toast.error('Failed to delete blog');
            }
          }}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Yes
        </button>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="bg-gray-300 text-black px-3 py-1 rounded"
        >
          No
        </button>
      </div>
    </span>
  ), {
    duration: 10000, 
  });
};


    if (loading) return <div className="text-center mt-10">Loading...</div>;
    if (!blog) return <div className="text-center mt-10">Blog not found</div>;

    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <p className="text-gray-700 mb-6">{blog.content}</p>
        <p className="text-gray-600 mb-4">
          By {blog.author.name} on {format(new Date(blog.createdAt), 'MMM dd, yyyy')}
        </p>
        {user && user._id === blog.author._id && (
          <div className="space-x-4">
            <Link
              to={`/edit/${blog._id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    );
  }

  export default BlogDetail;
