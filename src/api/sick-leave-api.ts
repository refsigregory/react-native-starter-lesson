import {apiClient} from './client';
import {
  SickLeave,
  CreateSickLeaveData,
  ReviewSickLeaveData,
  ApiResponse,
  PaginatedResponse,
} from '../types';

export const sickLeaveApi = {
  // Create sick leave
  create: async (data: CreateSickLeaveData): Promise<ApiResponse<SickLeave>> => {
    const response = await apiClient.post('/sick-leaves', data);
    return response.data;
  },

  // Get my sick leaves
  getMySickLeaves: async (
    page = 1,
    limit = 10,
  ): Promise<PaginatedResponse<SickLeave>> => {
    const response = await apiClient.get('/sick-leaves/my', {
      params: {page, limit},
    });
    return response.data;
  },

  // Get all sick leaves (admin)
  getAll: async (
    page = 1,
    limit = 10,
    status?: string,
  ): Promise<PaginatedResponse<SickLeave>> => {
    const response = await apiClient.get('/sick-leaves', {
      params: {page, limit, status},
    });
    return response.data;
  },

  // Get sick leave by ID
  getById: async (id: number): Promise<ApiResponse<SickLeave>> => {
    const response = await apiClient.get(`/sick-leaves/${id}`);
    return response.data;
  },

  // Update sick leave
  update: async (
    id: number,
    data: Partial<CreateSickLeaveData>,
  ): Promise<ApiResponse<SickLeave>> => {
    const response = await apiClient.put(`/sick-leaves/${id}`, data);
    return response.data;
  },

  // Delete sick leave
  delete: async (id: number): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete(`/sick-leaves/${id}`);
    return response.data;
  },

  // Review sick leave (admin)
  review: async (
    id: number,
    data: ReviewSickLeaveData,
  ): Promise<ApiResponse<SickLeave>> => {
    const response = await apiClient.patch(`/sick-leaves/${id}/review`, data);
    return response.data;
  },
};
