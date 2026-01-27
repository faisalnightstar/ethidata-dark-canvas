import { Request, Response, NextFunction } from 'express';
import { Application } from '../models/Application.js';
import { Job } from '../models/Job.js';
import { sendEmail, emailTemplates } from '../services/email.service.js';
import { getFileUrl } from '../services/upload.service.js';
import { createError } from '../middleware/errorHandler.js';

// Submit job application (public)
export const submitApplication = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { jobId, name, email, phone, coverLetter, linkedIn } = req.body;

    // Check if job exists and is active
    const job = await Job.findById(jobId);
    if (!job || !job.isActive) {
      throw createError('Job not found or no longer accepting applications', 404);
    }

    // Check for resume file
    if (!req.file) {
      throw createError('Resume is required', 400);
    }

    const resumeUrl = getFileUrl(req.file.filename);

    // Create application
    const application = await Application.create({
      jobId,
      name,
      email,
      phone,
      resumeUrl,
      coverLetter,
      linkedIn,
    });

    // Send confirmation email
    const confirmationEmail = emailTemplates.applicationConfirmation(name, job.title);
    sendEmail({
      to: email,
      subject: confirmationEmail.subject,
      html: confirmationEmail.html,
    });

    res.status(201).json({
      success: true,
      data: {
        id: application._id,
        message: 'Your application has been submitted successfully!',
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get all applications (admin)
export const getApplications = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { jobId, status, page = 1, limit = 10 } = req.query;

    const query: Record<string, unknown> = {};
    if (jobId) {
      query.jobId = jobId;
    }
    if (status) {
      query.status = status;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [applications, total] = await Promise.all([
      Application.find(query)
        .populate('jobId', 'title department')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Application.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: {
        applications,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          pages: Math.ceil(total / Number(limit)),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get application by ID (admin)
export const getApplicationById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const application = await Application.findById(id)
      .populate('jobId', 'title department location');

    if (!application) {
      throw createError('Application not found', 404);
    }

    res.json({
      success: true,
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

// Update application status (admin)
export const updateApplicationStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['new', 'reviewing', 'interview', 'offer', 'rejected'];
    if (!validStatuses.includes(status)) {
      throw createError('Invalid status', 400);
    }

    const application = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!application) {
      throw createError('Application not found', 404);
    }

    res.json({
      success: true,
      data: application,
    });
  } catch (error) {
    next(error);
  }
};
