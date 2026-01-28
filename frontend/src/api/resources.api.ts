import { apiClient, ApiResponse } from './client';

export interface Resource {
  _id: string;
  title: string;
  slug: string;
  description: string;
  type: 'whitepaper' | 'ebook' | 'template' | 'guide';
  fileUrl: string;
  thumbnailUrl?: string;
  isGated: boolean;
  downloadCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ResourceDownloadData {
  email?: string;
  name?: string;
}

interface GetResourcesResponse {
  resources: Resource[];
  filters: {
    types: string[];
  };
}

interface DownloadResourceResponse {
  downloadUrl?: string;
  message: string;
}

interface ResourceFilters {
  type?: string;
}

export const resourcesApi = {
  // Get all resources
  getAll: (filters?: ResourceFilters): Promise<ApiResponse<GetResourcesResponse>> => {
    const query = new URLSearchParams();
    if (filters?.type) query.append('type', filters.type);
    
    const queryString = query.toString();
    return apiClient.get(`/resources${queryString ? `?${queryString}` : ''}`);
  },

  // Get resource by slug
  getBySlug: (slug: string): Promise<ApiResponse<Resource>> => {
    return apiClient.get(`/resources/${slug}`);
  },

  // Request download (captures email for gated content)
  requestDownload: (resourceId: string, data?: ResourceDownloadData): Promise<ApiResponse<DownloadResourceResponse>> => {
    return apiClient.post(`/resources/${resourceId}/download`, data || {});
  },

  // Create resource (admin)
  create: (data: Omit<Resource, '_id' | 'createdAt' | 'updatedAt' | 'downloadCount'>): Promise<ApiResponse<Resource>> => {
    return apiClient.post('/resources', data);
  },

  // Update resource (admin)
  update: (id: string, data: Partial<Resource>): Promise<ApiResponse<Resource>> => {
    return apiClient.put(`/resources/${id}`, data);
  },

  // Delete resource (admin)
  delete: (id: string): Promise<ApiResponse<{ message: string }>> => {
    return apiClient.delete(`/resources/${id}`);
  },
};
