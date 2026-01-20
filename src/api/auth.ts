import {apiClient} from './client';
import {ENDPOINTS} from '../constants/endpoints';
import {
  AuthResponse,
  LoginCredentials,
  RegisterData,
  ApiResponse,
  User,
} from '../types';

export const authApi = {
  // Register new employee
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await apiClient.post(`${ENDPOINTS.auth.baseUrl}${ENDPOINTS.auth.register}`, data);
    return response.data;
  },

  // Login as employee
  loginEmployee: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post(`${ENDPOINTS.auth.baseUrl}${ENDPOINTS.auth.loginEmployee}`, credentials);
    return response.data;
  },

  // Login as admin
  loginAdmin: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post(`${ENDPOINTS.auth.baseUrl}${ENDPOINTS.auth.loginAdmin}`, credentials);
    return response.data;
  },

  // Get current user
  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    const response = await apiClient.get(`${ENDPOINTS.auth.baseUrl}${ENDPOINTS.auth.me}`);
    return response.data;
  },

  // Change password
  changePassword: async (data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<ApiResponse<void>> => {
    const response = await apiClient.post(`${ENDPOINTS.auth.baseUrl}${ENDPOINTS.auth.changePassword}`, data);
    return response.data;
  },
};
