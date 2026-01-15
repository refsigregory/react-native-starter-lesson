import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import {authApi} from '../api';
import {
  saveToken,
  removeToken,
  saveUserData,
  removeUserData,
  getToken,
  getUserData,
} from '../utils/storage';
import {User, Admin, LoginCredentials, RegisterData, UserRole} from '../types';

interface AuthContextType {
  user: User | Admin | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  userRole: UserRole | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: User | Admin) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User | Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;
  const userRole: UserRole | null = user
    ? 'department' in user
      ? UserRole.EMPLOYEE
      : UserRole.ADMIN
    : null;

  // Load user data on app start
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const token = await getToken();
      const userData = await getUserData();

      if (token && userData) {
        setUser(userData);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      // Try employee login first
      let response;
      try {
        response = await authApi.loginEmployee(credentials);
      } catch (employeeError) {
        // If employee login fails, try admin login
        response = await authApi.loginAdmin(credentials);
      }

      await saveToken(response.data.token);
      await saveUserData(response.data.user);
      setUser(response.data.user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response = await authApi.register(data);
      await saveToken(response.data.token);
      await saveUserData(response.data.user);
      setUser(response.data.user);
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await removeToken();
      await removeUserData();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const updateUser = (userData: User | Admin) => {
    setUser(userData);
    saveUserData(userData);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        userRole,
        login,
        register,
        logout,
        updateUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
