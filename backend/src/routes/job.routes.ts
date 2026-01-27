import { Router } from 'express';
import {
  getJobs,
  getJobBySlug,
  createJob,
  updateJob,
  deleteJob,
} from '../controllers/job.controller.js';
import { validateBody } from '../middleware/validate.js';
import { jobSchema } from '../utils/validators.js';

const router = Router();

// Public routes
router.get('/', getJobs);
router.get('/:slug', getJobBySlug);

// Admin routes (add auth middleware when implementing authentication)
router.post('/', validateBody(jobSchema), createJob);
router.put('/:id', validateBody(jobSchema.partial()), updateJob);
router.delete('/:id', deleteJob);

export default router;
