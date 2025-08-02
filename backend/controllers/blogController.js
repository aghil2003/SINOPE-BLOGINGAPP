import { blogService } from '../services/blogService.js';

export const createBlog = async (req, res) => {
  try {
    const blog = await blogService.createBlog(req.body, req.userId);
    res.json(blog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await blogService.getAllBlogs();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBlog = async (req, res) => {
  try {
    const blog = await blogService.getBlogById(req.params.id);
    res.json(blog);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const updated = await blogService.updateBlog(req.params.id, req.body, req.userId);
    res.json(updated);
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const result = await blogService.deleteBlog(req.params.id, req.userId);
    res.json(result);
  } catch (err) {
    console.log(err);
    
    res.status(403).json({ message: err.message });
  }
};
