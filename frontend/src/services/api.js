import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = (userData) => api.post('/auth/register', userData);
export const loginUser = (credentials) => api.post('/auth/login', credentials);
export const getCurrentUser = () => api.get('/users/me');
export const getBlogs = () => api.get('/blogs');
export const getBlogById = (id) => api.get(`/blogs/${id}`);
export const createBlog = (blogData) => api.post('/blogs', blogData);
export const updateBlog = (id, blogData) => api.put(`/blogs/${id}`, blogData);
export const deleteBlog = (id) => api.delete(`/blogs/${id}`);

