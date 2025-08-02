import express from 'express';
import {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog
} from '../controllers/blogController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getBlogs);
router.route('/').post(protect, createBlog);
router.route('/:id').get(getBlog);
router.route('/:id').put(protect, updateBlog);
router.route('/:id').delete(protect, deleteBlog);

export default router;
