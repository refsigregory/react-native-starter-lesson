import {apiClient} from './client';
import {User, PaginatedResponse, ApiResponse} from '../types';

export const employeeApi = {
  // Get all employees (admin)
  getAll: async (page = 1, limit = 10): Promise<PaginatedResponse<User>> => {
    const response = await apiClient.get('/employees', {
      params: {page, limit},
    });
    return response.data;
  },

  // Get employee by ID (admin)
  getById: async (id: number): Promise<ApiResponse<User>> => {
    const response = await apiClient.get(`/employees/${id}`);
    return response.data;
  },

  // Update employee (admin)
  update: async (
    id: number,
    data: Partial<User>,
  ): Promise<ApiResponse<User>> => {
    const response = await apiClient.put(`/employees/${id}`, data);
    return response.data;
  },

  // Delete employee (admin)
  delete: async (id: number): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete(`/employees/${id}`);
    return response.data;
  },

  // Toggle employee status (admin)
  toggleStatus: async (id: number): Promise<ApiResponse<User>> => {
    const response = await apiClient.patch(`/employees/${id}/toggle-status`);
    return response.data;
  },
};
