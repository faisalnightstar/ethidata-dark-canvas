import { Request, Response, NextFunction } from 'express';
import { BlogPost } from '../models/BlogPost.js';
import { createError } from '../middleware/errorHandler.js';

// Get all published blog posts (public)
export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { category, tag, search, page = 1, limit = 10 } = req.query;

    const query: Record<string, unknown> = { isPublished: true };

    if (category) {
      query.category = category;
    }
    if (tag) {
      query.tags = tag;
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [posts, total, categories, tags] = await Promise.all([
      BlogPost.find(query)
        .select('-content -__v')
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      BlogPost.countDocuments(query),
      BlogPost.distinct('category', { isPublished: true }),
      BlogPost.distinct('tags', { isPublished: true }),
    ]);

    res.json({
      success: true,
      data: {
        posts,
        filters: {
          categories,
          tags,
        },
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

// Get post by slug (public)
export const getPostBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { slug } = req.params;

    const post = await BlogPost.findOneAndUpdate(
      { slug, isPublished: true },
      { $inc: { viewCount: 1 } },
      { new: true }
    ).select('-__v');

    if (!post) {
      throw createError('Post not found', 404);
    }

    // Get related posts (same category, excluding current)
    const relatedPosts = await BlogPost.find({
      category: post.category,
      _id: { $ne: post._id },
      isPublished: true,
    })
      .select('title slug excerpt coverImage publishedAt')
      .sort({ publishedAt: -1 })
      .limit(3);

    res.json({
      success: true,
      data: {
        post,
        relatedPosts,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Create post (admin)
export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const post = await BlogPost.create(req.body);

    res.status(201).json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

// Update post (admin)
export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const post = await BlogPost.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!post) {
      throw createError('Post not found', 404);
    }

    res.json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

// Delete post (admin)
export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const post = await BlogPost.findByIdAndDelete(id);

    if (!post) {
      throw createError('Post not found', 404);
    }

    res.json({
      success: true,
      message: 'Post deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Get all posts including drafts (admin)
export const getAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    const [posts, total] = await Promise.all([
      BlogPost.find()
        .select('-content -__v')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      BlogPost.countDocuments(),
    ]);

    res.json({
      success: true,
      data: {
        posts,
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
