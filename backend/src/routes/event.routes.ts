import { Router } from 'express';
import {
  getEvents,
  getEventBySlug,
  registerForEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventRegistrations,
} from '../controllers/event.controller.js';
import { validateBody } from '../middleware/validate.js';
import { formLimiter } from '../middleware/rateLimiter.js';
import { eventSchema, eventRegistrationSchema } from '../utils/validators.js';

const router = Router();

// Public routes
router.get('/', getEvents);
router.get('/:slug', getEventBySlug);
router.post('/:id/register', formLimiter, validateBody(eventRegistrationSchema), registerForEvent);

// Admin routes (add auth middleware when implementing authentication)
router.post('/', validateBody(eventSchema), createEvent);
router.put('/:id', validateBody(eventSchema.partial()), updateEvent);
router.delete('/:id', deleteEvent);
router.get('/:id/registrations', getEventRegistrations);

export default router;
