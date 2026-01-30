import { Request, Response, NextFunction } from 'express';
import { Job } from '../models/Job.js';
import { createError } from '../middleware/errorHandler.js';

// Get all active jobs (public)
export const getJobs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { department, location, type, search } = req.query;
    console.log("req.query", req.query);

    const query: Record<string, unknown> = { isActive: true };

    if (department) {
      query.department = department;
    }
    if (location) {
      query.location = location;
    }
    if (type) {
      query.type = type;
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const jobs = await Job.find(query)
      .select('-__v')
      .sort({ createdAt: -1 });

    // Get unique departments and locations for filters
    const [departments, locations] = await Promise.all([
      Job.distinct('department', { isActive: true }),
      Job.distinct('location', { isActive: true }),
    ]);

    res.json({
      success: true,
      data: {
        jobs,
        filters: {
          departments,
          locations,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get job by slug (public)
export const getJobBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { slug } = req.params;

    const job = await Job.findOne({ slug, isActive: true }).select('-__v');

    if (!job) {
      throw createError('Job not found', 404);
    }

    res.json({
      success: true,
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

// Create job (admin)
export const createJob = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const job = await Job.create(req.body);

    res.status(201).json({
      success: true,
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

// Update job (admin)
export const updateJob = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const job = await Job.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!job) {
      throw createError('Job not found', 404);
    }

    res.json({
      success: true,
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

// Delete job (admin)
export const deleteJob = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const job = await Job.findByIdAndDelete(id);

    if (!job) {
      throw createError('Job not found', 404);
    }

    res.json({
      success: true,
      message: 'Job deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
