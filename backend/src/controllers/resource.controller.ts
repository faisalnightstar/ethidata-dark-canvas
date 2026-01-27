import { Request, Response, NextFunction } from 'express';
import { Resource, ResourceDownload } from '../models/Resource.js';
import { sendEmail, emailTemplates } from '../services/email.service.js';
import { createError } from '../middleware/errorHandler.js';

// Get all resources (public)
export const getResources = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { type } = req.query;

    const query: Record<string, unknown> = {};
    if (type) {
      query.type = type;
    }

    const resources = await Resource.find(query)
      .select('-__v')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: {
        resources,
        filters: {
          types: ['whitepaper', 'ebook', 'template', 'guide'],
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get resource by slug (public)
export const getResourceBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { slug } = req.params;

    const resource = await Resource.findOne({ slug }).select('-__v');

    if (!resource) {
      throw createError('Resource not found', 404);
    }

    res.json({
      success: true,
      data: resource,
    });
  } catch (error) {
    next(error);
  }
};

// Request resource download (public)
export const requestDownload = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { email, name } = req.body;

    const resource = await Resource.findById(id);
    if (!resource) {
      throw createError('Resource not found', 404);
    }

    // For gated content, require email
    if (resource.isGated && !email) {
      throw createError('Email is required for this download', 400);
    }

    // Track download
    if (email) {
      await ResourceDownload.create({
        resourceId: id,
        email,
        name,
      });

      // Send email with download link
      const downloadEmail = emailTemplates.resourceDownloadLink(
        name,
        resource.title,
        resource.fileUrl
      );
      sendEmail({
        to: email,
        subject: downloadEmail.subject,
        html: downloadEmail.html,
      });
    }

    // Increment download count
    await Resource.findByIdAndUpdate(id, {
      $inc: { downloadCount: 1 },
    });

    res.json({
      success: true,
      data: {
        downloadUrl: resource.isGated ? undefined : resource.fileUrl,
        message: resource.isGated
          ? 'Download link has been sent to your email'
          : 'Download ready',
      },
    });
  } catch (error) {
    next(error);
  }
};

// Create resource (admin)
export const createResource = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const resource = await Resource.create(req.body);

    res.status(201).json({
      success: true,
      data: resource,
    });
  } catch (error) {
    next(error);
  }
};

// Update resource (admin)
export const updateResource = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const resource = await Resource.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!resource) {
      throw createError('Resource not found', 404);
    }

    res.json({
      success: true,
      data: resource,
    });
  } catch (error) {
    next(error);
  }
};

// Delete resource (admin)
export const deleteResource = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const resource = await Resource.findByIdAndDelete(id);

    if (!resource) {
      throw createError('Resource not found', 404);
    }

    res.json({
      success: true,
      message: 'Resource deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Get download stats (admin)
export const getDownloadStats = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const [resource, downloads] = await Promise.all([
      Resource.findById(id),
      ResourceDownload.find({ resourceId: id })
        .select('email name downloadedAt')
        .sort({ downloadedAt: -1 })
        .limit(100),
    ]);

    if (!resource) {
      throw createError('Resource not found', 404);
    }

    res.json({
      success: true,
      data: {
        totalDownloads: resource.downloadCount,
        recentDownloads: downloads,
      },
    });
  } catch (error) {
    next(error);
  }
};
