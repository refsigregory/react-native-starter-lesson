import {API_BASE_URL, API_TIMEOUT} from '@env';

// Fallback for Android emulator (10.0.2.2 is the host machine from Android emulator)
const BASE_URL = API_BASE_URL || 'http://10.0.2.2:3000/api';
const TIMEOUT = parseInt(API_TIMEOUT || '10000', 10);

// Log to verify .env is loaded (remove in production)
console.log('🔧 Config loaded:', {
  BASE_URL,
  TIMEOUT,
  fromEnv: !!API_BASE_URL,
});

export const API_CONFIG = {
  BASE_URL,
  TIMEOUT,
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: '@auth_token',
  USER_DATA: '@user_data',
};

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
};
