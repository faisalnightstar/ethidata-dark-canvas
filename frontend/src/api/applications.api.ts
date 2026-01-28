import { apiClient, ApiResponse } from './client';
import { Job } from './jobs.api';

export interface Application {
  _id: string;
  jobId: string | Job;
  name: string;
  email: string;
  phone: string;
  resumeUrl: string;
  coverLetter?: string;
  linkedIn?: string;
  status: 'new' | 'reviewing' | 'interview' | 'offer' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationFormData {
  jobId: string;
  name: string;
  email: string;
  phone: string;
  coverLetter?: string;
  linkedIn?: string;
  resume: File;
}

interface SubmitApplicationResponse {
  id: string;
  message: string;
}

interface GetApplicationsResponse {
  applications: Application[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export const applicationsApi = {
  // Submit job application
  submit: (data: ApplicationFormData): Promise<ApiResponse<SubmitApplicationResponse>> => {
    const formData = new FormData();
    formData.append('jobId', data.jobId);
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    if (data.coverLetter) formData.append('coverLetter', data.coverLetter);
    if (data.linkedIn) formData.append('linkedIn', data.linkedIn);
    formData.append('resume', data.resume);

    return apiClient.uploadFile('/applications', formData);
  },

  // Get all applications (admin)
  getAll: (params?: { jobId?: string; status?: string; page?: number; limit?: number }): Promise<ApiResponse<GetApplicationsResponse>> => {
    const query = new URLSearchParams();
    if (params?.jobId) query.append('jobId', params.jobId);
    if (params?.status) query.append('status', params.status);
    if (params?.page) query.append('page', params.page.toString());
    if (params?.limit) query.append('limit', params.limit.toString());
    
    const queryString = query.toString();
    return apiClient.get(`/applications${queryString ? `?${queryString}` : ''}`);
  },

  // Get application by ID (admin)
  getById: (id: string): Promise<ApiResponse<Application>> => {
    return apiClient.get(`/applications/${id}`);
  },

  // Update application status (admin)
  updateStatus: (id: string, status: Application['status']): Promise<ApiResponse<Application>> => {
    return apiClient.patch(`/applications/${id}/status`, { status });
  },
};
