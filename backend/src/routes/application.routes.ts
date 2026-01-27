import { Router } from 'express';
import {
  submitApplication,
  getApplications,
  getApplicationById,
  updateApplicationStatus,
} from '../controllers/application.controller.js';
import { applicationLimiter } from '../middleware/rateLimiter.js';
import { uploadResume } from '../services/upload.service.js';

const router = Router();

// Public routes
router.post('/', applicationLimiter, uploadResume, submitApplication);

// Admin routes (add auth middleware when implementing authentication)
router.get('/', getApplications);
router.get('/:id', getApplicationById);
router.patch('/:id/status', updateApplicationStatus);

export default router;
