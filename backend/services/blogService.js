import Blog from '../models/Blog.js';

const createBlog = async (data, userId) => {
  const blog = await Blog.create({ ...data, author: userId });
  return blog;
};

const getAllBlogs = async () => {
  const blogs = await Blog.find().populate('author', 'name email');
  return blogs;
};

const getBlogById = async (id) => {
  const blog = await Blog.findById(id).populate('author', 'name email');
  return blog;
};

const updateBlog = async (id, data, userId) => {
  const blog = await Blog.findById(id);
  if (!blog) throw new Error('Blog not found');
  if (blog.author.toString() !== userId) throw new Error('Not authorized');

  const updated = await Blog.findByIdAndUpdate(id, data, { new: true });
  return updated;
};

const deleteBlog = async (id, userId) => {
  const blog = await Blog.findById(id);
  if (!blog) throw new Error('Blog not found');

  if (blog.author.toString() !== userId) {
    throw new Error('Not authorized');
  }

  await Blog.findByIdAndDelete(id);
  return { message: 'Deleted successfully' };
};

export const blogService = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
