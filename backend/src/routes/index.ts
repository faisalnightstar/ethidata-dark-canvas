import { Router } from 'express';
import contactRoutes from './contact.routes.js';
import jobRoutes from './job.routes.js';
import applicationRoutes from './application.routes.js';
import blogRoutes from './blog.routes.js';
import eventRoutes from './event.routes.js';
import resourceRoutes from './resource.routes.js';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
  });
});

// Mount routes
router.use('/contact', contactRoutes);
router.use('/jobs', jobRoutes);
router.use('/applications', applicationRoutes);
router.use('/blog', blogRoutes);
router.use('/events', eventRoutes);
router.use('/resources', resourceRoutes);

export default router;
