import { apiClient, ApiResponse } from './client';

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  category: string;
  tags: string[];
  coverImage?: string;
  isPublished: boolean;
  publishedAt?: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

interface GetPostsResponse {
  posts: Omit<BlogPost, 'content'>[];
  filters: {
    categories: string[];
    tags: string[];
  };
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

interface GetPostBySlugResponse {
  post: BlogPost;
  relatedPosts: Omit<BlogPost, 'content'>[];
}

interface BlogFilters {
  category?: string;
  tag?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export const blogApi = {
  // Get all published posts
  getAll: (filters?: BlogFilters): Promise<ApiResponse<GetPostsResponse>> => {
    const query = new URLSearchParams();
    if (filters?.category) query.append('category', filters.category);
    if (filters?.tag) query.append('tag', filters.tag);
    if (filters?.search) query.append('search', filters.search);
    if (filters?.page) query.append('page', filters.page.toString());
    if (filters?.limit) query.append('limit', filters.limit.toString());
    
    const queryString = query.toString();
    return apiClient.get(`/blog${queryString ? `?${queryString}` : ''}`);
  },

  // Get post by slug
  getBySlug: (slug: string): Promise<ApiResponse<GetPostBySlugResponse>> => {
    return apiClient.get(`/blog/${slug}`);
  },

  // Create post (admin)
  create: (data: Omit<BlogPost, '_id' | 'createdAt' | 'updatedAt' | 'viewCount'>): Promise<ApiResponse<BlogPost>> => {
    return apiClient.post('/blog', data);
  },

  // Update post (admin)
  update: (id: string, data: Partial<BlogPost>): Promise<ApiResponse<BlogPost>> => {
    return apiClient.put(`/blog/${id}`, data);
  },

  // Delete post (admin)
  delete: (id: string): Promise<ApiResponse<{ message: string }>> => {
    return apiClient.delete(`/blog/${id}`);
  },
};
