export enum UserRole {
  EMPLOYEE = 'employee',
  ADMIN = 'admin',
}

export enum SickLeaveStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  department?: string;
  position?: string;
  hireDate?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Admin {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SickLeave {
  id: number;
  employeeId: number;
  startDate: string;
  endDate: string;
  reason: string;
  medicalCertificate?: string;
  status: SickLeaveStatus;
  adminComment?: string;
  reviewedBy?: number;
  reviewedAt?: string;
  createdAt: string;
  updatedAt: string;
  employee?: User;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User | Admin;
    token: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  department?: string;
  position?: string;
}

export interface CreateSickLeaveData {
  startDate: string;
  endDate: string;
  reason: string;
  medicalCertificate?: string;
}

export interface ReviewSickLeaveData {
  status: SickLeaveStatus;
  adminComment?: string;
}
