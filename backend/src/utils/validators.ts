import { z } from 'zod';

// Contact form validation
export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

// Job application validation
export const applicationSchema = z.object({
  jobId: z.string().min(1, 'Job ID is required'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  coverLetter: z.string().optional(),
  linkedIn: z.string().url('Invalid LinkedIn URL').optional().or(z.literal('')),
});

// Event registration validation
export const eventRegistrationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
});

// Resource download validation (for gated content)
export const resourceDownloadSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
});

// Partnership inquiry validation
export const partnershipSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().min(2, 'Company name is required'),
  partnerType: z.enum(['Technology', 'Reseller', 'Consulting']),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

// Blog post validation (admin)
export const blogPostSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters'),
  excerpt: z.string().min(20, 'Excerpt must be at least 20 characters'),
  content: z.string().min(100, 'Content must be at least 100 characters'),
  category: z.string().min(2, 'Category is required'),
  tags: z.array(z.string()).optional(),
  coverImage: z.string().url('Invalid cover image URL').optional(),
  isPublished: z.boolean().optional(),
});

// Job listing validation (admin)
export const jobSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters'),
  department: z.string().min(2, 'Department is required'),
  location: z.string().min(2, 'Location is required'),
  type: z.enum(['Full-time', 'Part-time', 'Contract']),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  requirements: z.array(z.string()).min(1, 'At least one requirement is needed'),
  responsibilities: z.array(z.string()).min(1, 'At least one responsibility is needed'),
  salary: z.object({
    min: z.number().positive(),
    max: z.number().positive(),
    currency: z.string().default('USD'),
  }).optional(),
  isActive: z.boolean().optional(),
});

// Event validation (admin)
export const eventSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  type: z.enum(['webinar', 'workshop', 'conference']),
  date: z.string().or(z.date()),
  time: z.string(),
  duration: z.string(),
  speakers: z.array(z.object({
    name: z.string(),
    role: z.string(),
    avatar: z.string().optional(),
  })).optional(),
  maxAttendees: z.number().positive().optional(),
  isActive: z.boolean().optional(),
});

// Resource validation (admin)
export const resourceSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  type: z.enum(['whitepaper', 'ebook', 'template', 'guide']),
  fileUrl: z.string().url('Invalid file URL'),
  thumbnailUrl: z.string().url('Invalid thumbnail URL').optional(),
  isGated: z.boolean().default(false),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ApplicationInput = z.infer<typeof applicationSchema>;
export type EventRegistrationInput = z.infer<typeof eventRegistrationSchema>;
export type ResourceDownloadInput = z.infer<typeof resourceDownloadSchema>;
export type PartnershipInput = z.infer<typeof partnershipSchema>;
export type BlogPostInput = z.infer<typeof blogPostSchema>;
export type JobInput = z.infer<typeof jobSchema>;
export type EventInput = z.infer<typeof eventSchema>;
export type ResourceInput = z.infer<typeof resourceSchema>;
