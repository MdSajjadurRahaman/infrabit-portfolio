import axios, { AxiosError } from 'axios';

// Create an axios instance with default configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: false,
  timeout: 10000,
});

// Error handling interceptor
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const { response } = error;
    
    // Log errors to console for debugging
    console.error('API Error:', error);
    
    // Handle specific error cases
    if (!response) {
      console.error('Network error or server not responding');
    } else {
      // Log status and error message
      console.error(`Status: ${response.status}, ${response.statusText}`);
      console.error('Error Data:', response.data);
    }
    
    return Promise.reject(error);
  }
);

// Projects API
export const getProjects = () => api.get('/projects');
export const getFeaturedProjects = () => api.get('/projects/featured');
export const getProjectById = (id: string) => api.get(`/projects/${id}`);
export const createProject = (data: any) => api.post('/projects', data);
export const updateProject = (id: string, data: any) => api.put(`/projects/${id}`, data);
export const deleteProject = (id: string) => api.delete(`/projects/${id}`);

// Services API
export const getServices = () => api.get('/services');
export const getServiceById = (id: string) => api.get(`/services/${id}`);
export const createService = (data: any) => api.post('/services', data);
export const updateService = (id: string, data: any) => api.put(`/services/${id}`, data);
export const deleteService = (id: string) => api.delete(`/services/${id}`);

// Team Members API
export const getTeamMembers = () => api.get('/team');
export const getTeamMemberById = (id: string) => api.get(`/team/${id}`);
export const createTeamMember = (data: any) => api.post('/team', data);
export const updateTeamMember = (id: string, data: any) => api.put(`/team/${id}`, data);
export const deleteTeamMember = (id: string) => api.delete(`/team/${id}`);

// Testimonials API
export const getTestimonials = () => api.get('/testimonials');
export const getFeaturedTestimonials = () => api.get('/testimonials/featured');
export const getTestimonialById = (id: string) => api.get(`/testimonials/${id}`);
export const createTestimonial = (data: any) => api.post('/testimonials', data);
export const updateTestimonial = (id: string, data: any) => api.put(`/testimonials/${id}`, data);
export const deleteTestimonial = (id: string) => api.delete(`/testimonials/${id}`);

// Contact API
export const submitContactForm = (formData: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}) => api.post('/contact', formData);
export const getContactSubmissions = () => api.get('/contact');

export default api;
