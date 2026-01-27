import rateLimit from 'express-rate-limit';

// General API rate limiter
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: {
    success: false,
    error: {
      message: 'Too many requests, please try again later.',
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter rate limiter for form submissions
export const formLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 form submissions per hour
  message: {
    success: false,
    error: {
      message: 'Too many form submissions, please try again later.',
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Even stricter limiter for job applications
export const applicationLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 5, // Limit each IP to 5 applications per day
  message: {
    success: false,
    error: {
      message: 'Too many applications submitted, please try again tomorrow.',
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
});
