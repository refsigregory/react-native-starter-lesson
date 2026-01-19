import {apiClient} from './client';
import {ENDPOINTS} from '../constants/endpoints';
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
    const response = await apiClient.post(ENDPOINTS.sickLeaves.create, data);
    return response.data;
  },

  // Get my sick leaves
  getMySickLeaves: async (
    page = 1,
    limit = 10,
  ): Promise<PaginatedResponse<SickLeave>> => {
    const response = await apiClient.get(ENDPOINTS.sickLeaves.my, {
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
    const response = await apiClient.get(ENDPOINTS.sickLeaves.list, {
      params: {page, limit, status},
    });
    return response.data;
  },

  // Get sick leave by ID
  getById: async (id: number): Promise<ApiResponse<SickLeave>> => {
    const response = await apiClient.get(ENDPOINTS.sickLeaves.detail(id));
    return response.data;
  },

  // Update sick leave
  update: async (
    id: number,
    data: Partial<CreateSickLeaveData>,
  ): Promise<ApiResponse<SickLeave>> => {
    const response = await apiClient.put(ENDPOINTS.sickLeaves.update(id), data);
    return response.data;
  },

  // Delete sick leave
  delete: async (id: number): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete(ENDPOINTS.sickLeaves.delete(id));
    return response.data;
  },

  // Review sick leave (admin)
  review: async (
    id: number,
    data: ReviewSickLeaveData,
  ): Promise<ApiResponse<SickLeave>> => {
    const response = await apiClient.patch(ENDPOINTS.sickLeaves.review(id), data);
    return response.data;
  },
};
