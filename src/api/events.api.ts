import { apiClient, ApiResponse } from './client';

export interface Event {
  _id: string;
  title: string;
  slug: string;
  description: string;
  type: 'webinar' | 'workshop' | 'conference';
  date: string;
  time: string;
  duration: string;
  speakers: Array<{
    name: string;
    role: string;
    avatar?: string;
  }>;
  registrationUrl?: string;
  recordingUrl?: string;
  maxAttendees?: number;
  currentAttendees: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EventRegistrationData {
  name: string;
  email: string;
  company?: string;
}

interface GetEventsResponse {
  events: Event[];
  filters: {
    types: string[];
  };
}

interface RegisterEventResponse {
  message: string;
  eventTitle: string;
  eventDate: string;
}

interface EventFilters {
  type?: string;
  upcoming?: boolean;
}

export const eventsApi = {
  // Get all events
  getAll: (filters?: EventFilters): Promise<ApiResponse<GetEventsResponse>> => {
    const query = new URLSearchParams();
    if (filters?.type) query.append('type', filters.type);
    if (filters?.upcoming !== undefined) query.append('upcoming', filters.upcoming.toString());
    
    const queryString = query.toString();
    return apiClient.get(`/events${queryString ? `?${queryString}` : ''}`);
  },

  // Get event by slug
  getBySlug: (slug: string): Promise<ApiResponse<Event>> => {
    return apiClient.get(`/events/${slug}`);
  },

  // Register for event
  register: (eventId: string, data: EventRegistrationData): Promise<ApiResponse<RegisterEventResponse>> => {
    return apiClient.post(`/events/${eventId}/register`, data);
  },

  // Create event (admin)
  create: (data: Omit<Event, '_id' | 'createdAt' | 'updatedAt' | 'currentAttendees'>): Promise<ApiResponse<Event>> => {
    return apiClient.post('/events', data);
  },

  // Update event (admin)
  update: (id: string, data: Partial<Event>): Promise<ApiResponse<Event>> => {
    return apiClient.put(`/events/${id}`, data);
  },

  // Delete event (admin)
  delete: (id: string): Promise<ApiResponse<{ message: string }>> => {
    return apiClient.delete(`/events/${id}`);
  },
};
