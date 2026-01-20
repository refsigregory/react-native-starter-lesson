import {API_BASE_URL} from '@env';

// Fallback for Android emulator (10.0.2.2 is the host machine from Android emulator)
const BASE_URL = API_BASE_URL || 'http://10.0.2.2:3000/api';

console.log('🔗 ENDPOINTS BASE_URL:', BASE_URL);

export const ENDPOINTS = {
  auth: {
    baseUrl: BASE_URL,
    register: '/auth/register',
    loginEmployee: '/auth/login/employee',
    loginAdmin: '/auth/login/admin',
    me: '/auth/me',
    logout: '/auth/logout',
    changePassword: '/auth/change-password',
  },
  employees: {
    baseUrl: BASE_URL,
    list: '/employees',
    detail: (id: number) => `/employees/${id}`,
    update: (id: number) => `/employees/${id}`,
    delete: (id: number) => `/employees/${id}`,
    toggleStatus: (id: number) => `/employees/${id}/toggle-status`,
  },
  sickLeaves: {
    baseUrl: BASE_URL,
    create: '/sick-leaves',
    list: '/sick-leaves',
    my: '/sick-leaves/my',
    detail: (id: number) => `/sick-leaves/${id}`,
    update: (id: number) => `/sick-leaves/${id}`,
    delete: (id: number) => `/sick-leaves/${id}`,
    review: (id: number) => `/sick-leaves/${id}/review`,
    exportPdf: (id: number) => `/sick-leaves/${id}/export-pdf`,
  },
} as const;
