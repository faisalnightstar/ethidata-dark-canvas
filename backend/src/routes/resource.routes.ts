import { Router } from 'express';
import {
  getResources,
  getResourceBySlug,
  requestDownload,
  createResource,
  updateResource,
  deleteResource,
  getDownloadStats,
} from '../controllers/resource.controller.js';
import { validateBody } from '../middleware/validate.js';
import { formLimiter } from '../middleware/rateLimiter.js';
import { resourceSchema, resourceDownloadSchema } from '../utils/validators.js';

const router = Router();

// Public routes
router.get('/', getResources);
router.get('/:slug', getResourceBySlug);
router.post('/:id/download', formLimiter, validateBody(resourceDownloadSchema.partial()), requestDownload);

// Admin routes (add auth middleware when implementing authentication)
router.post('/', validateBody(resourceSchema), createResource);
router.put('/:id', validateBody(resourceSchema.partial()), updateResource);
router.delete('/:id', deleteResource);
router.get('/:id/stats', getDownloadStats);

export default router;
