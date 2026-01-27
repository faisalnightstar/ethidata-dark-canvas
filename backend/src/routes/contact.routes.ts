import { Router } from 'express';
import {
  submitContact,
  getContacts,
  updateContactStatus,
} from '../controllers/contact.controller.js';
import { validateBody } from '../middleware/validate.js';
import { formLimiter } from '../middleware/rateLimiter.js';
import { contactSchema } from '../utils/validators.js';

const router = Router();

// Public routes
router.post('/', formLimiter, validateBody(contactSchema), submitContact);

// Admin routes (add auth middleware when implementing authentication)
router.get('/', getContacts);
router.patch('/:id/status', updateContactStatus);

export default router;
