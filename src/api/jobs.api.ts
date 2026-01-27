import { apiClient, ApiResponse } from './client';

export interface Job {
  _id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  description: string;
  requirements: string[];
  responsibilities: string[];
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface GetJobsResponse {
  jobs: Job[];
  filters: {
    departments: string[];
    locations: string[];
  };
}

interface JobFilters {
  department?: string;
  location?: string;
  type?: string;
  search?: string;
}

export const jobsApi = {
  // Get all active jobs
  getAll: (filters?: JobFilters): Promise<ApiResponse<GetJobsResponse>> => {
    const query = new URLSearchParams();
    if (filters?.department) query.append('department', filters.department);
    if (filters?.location) query.append('location', filters.location);
    if (filters?.type) query.append('type', filters.type);
    if (filters?.search) query.append('search', filters.search);
    
    const queryString = query.toString();
    return apiClient.get(`/jobs${queryString ? `?${queryString}` : ''}`);
  },

  // Get job by slug
  getBySlug: (slug: string): Promise<ApiResponse<Job>> => {
    return apiClient.get(`/jobs/${slug}`);
  },

  // Create job (admin)
  create: (data: Omit<Job, '_id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Job>> => {
    return apiClient.post('/jobs', data);
  },

  // Update job (admin)
  update: (id: string, data: Partial<Job>): Promise<ApiResponse<Job>> => {
    return apiClient.put(`/jobs/${id}`, data);
  },

  // Delete job (admin)
  delete: (id: string): Promise<ApiResponse<{ message: string }>> => {
    return apiClient.delete(`/jobs/${id}`);
  },
};
