import { apiClient, ApiResponse } from './client';

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
}

export interface ContactSubmission {
  _id: string;
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
  updatedAt: string;
}

interface SubmitContactResponse {
  id: string;
  message: string;
}

interface GetContactsResponse {
  contacts: ContactSubmission[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export const contactApi = {
  // Submit contact form
  submit: (data: ContactFormData): Promise<ApiResponse<SubmitContactResponse>> => {
    return apiClient.post('/contact', data);
  },

  // Get all contacts (admin)
  getAll: (params?: { status?: string; page?: number; limit?: number }): Promise<ApiResponse<GetContactsResponse>> => {
    const query = new URLSearchParams();
    if (params?.status) query.append('status', params.status);
    if (params?.page) query.append('page', params.page.toString());
    if (params?.limit) query.append('limit', params.limit.toString());
    
    const queryString = query.toString();
    return apiClient.get(`/contact${queryString ? `?${queryString}` : ''}`);
  },

  // Update contact status (admin)
  updateStatus: (id: string, status: 'new' | 'read' | 'replied'): Promise<ApiResponse<ContactSubmission>> => {
    return apiClient.patch(`/contact/${id}/status`, { status });
  },
};
