import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getBlogs } from '../services/api';
import BlogCard from './BlogCard';
import { toast } from 'react-toastify';

function Profile() {
  const { user } = useSelector((state) => state.auth);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await getBlogs();
        const userBlogs = res.data.filter((blog) => blog.author._id === user._id);
        setBlogs(userBlogs);
      } catch (err) {
        toast.error('Failed to fetch blogs');
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchBlogs();
  }, [user]);

  if (!user) return <div className="text-center mt-10">Please login to view your profile</div>;
  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
      </div>
      <h2 className="text-2xl font-bold mb-4">Your Blogs</h2>
      {blogs.length === 0 ? (
        <p className="text-gray-600">You haven't created any blogs yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;
