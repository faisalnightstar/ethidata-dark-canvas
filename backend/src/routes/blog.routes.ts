import { Router } from 'express';
import {
  getPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
} from '../controllers/blog.controller.js';
import { validateBody } from '../middleware/validate.js';
import { blogPostSchema } from '../utils/validators.js';

const router = Router();

// Public routes
router.get('/', getPosts);
router.get('/:slug', getPostBySlug);

// Admin routes (add auth middleware when implementing authentication)
router.get('/admin/all', getAllPosts);
router.post('/', validateBody(blogPostSchema), createPost);
router.put('/:id', validateBody(blogPostSchema.partial()), updatePost);
router.delete('/:id', deletePost);

export default router;
