import { Link } from 'react-router-dom';
import { format } from 'date-fns';

function BlogCard({ blog }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
      <p className="text-gray-600 mb-2">
        By {blog.author.name} on {format(new Date(blog.createdAt), 'MMM dd, yyyy')}
      </p>
      <p className="text-gray-700 mb-4">{blog.content.substring(0, 100)}...</p>
      <Link
        to={`/blogs/${blog._id}`}
        className="text-blue-600 hover:text-blue-800"
      >
        Read More
      </Link>
    </div>
  );
}

export default BlogCard;