import {API_BASE_URL} from '@env';

// Fallback for Android emulator (10.0.2.2 is the host machine from Android emulator)
const BASE_URL = API_BASE_URL || 'http://10.0.2.2:3000/api';

export const ENDPOINTS = {
  auth: {
    baseUrl: BASE_URL,
    register: `${BASE_URL}/auth/register`,
    loginEmployee: `${BASE_URL}/auth/login/employee`,
    loginAdmin: `${BASE_URL}/auth/login/admin`,
    me: `${BASE_URL}/auth/me`,
    logout: `${BASE_URL}/auth/logout`,
    changePassword: `${BASE_URL}/auth/change-password`,
  },
  employees: {
    baseUrl: BASE_URL, // Can be different service URL in microservices
    list: `${BASE_URL}/employees`,
    detail: (id: number) => `${BASE_URL}/employees/${id}`,
    update: (id: number) => `${BASE_URL}/employees/${id}`,
    delete: (id: number) => `${BASE_URL}/employees/${id}`,
    toggleStatus: (id: number) => `${BASE_URL}/employees/${id}/toggle-status`,
  },
  sickLeaves: {
    baseUrl: BASE_URL, // Can be different service URL in microservices
    create: `${BASE_URL}/sick-leaves`,
    list: `${BASE_URL}/sick-leaves`,
    my: `${BASE_URL}/sick-leaves/my`,
    detail: (id: number) => `${BASE_URL}/sick-leaves/${id}`,
    update: (id: number) => `${BASE_URL}/sick-leaves/${id}`,
    delete: (id: number) => `${BASE_URL}/sick-leaves/${id}`,
    review: (id: number) => `${BASE_URL}/sick-leaves/${id}/review`,
    exportPdf: (id: number) => `${BASE_URL}/sick-leaves/${id}/export-pdf`,
  },
} as const;
