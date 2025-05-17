import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import api from '../services/api';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (token: string, password: string) => Promise<boolean>;
  user: string | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token');
      
      if (token) {
        try {
          // Set the default Authorization header for all requests
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Get user info from server
          const response = await api.get('/auth/me');
          setUser(response.data.username);
          setIsAuthenticated(true);
        } catch (error) {
          // If token is invalid, clear it
          localStorage.removeItem('auth_token');
          delete api.defaults.headers.common['Authorization'];
        }
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await api.post('/auth/login', { username, password });
      
      // Save token to localStorage
      localStorage.setItem('auth_token', response.data.token);
      
      // Set the default Authorization header for all requests
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      
      setUser(response.data.user.username);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem('auth_token');
    
    // Remove Authorization header
    delete api.defaults.headers.common['Authorization'];
    
    setUser(null);
    setIsAuthenticated(false);
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    try {
      await api.post('/auth/forgot-password', { email });
      return true;
    } catch (error) {
      console.error('Forgot password error:', error);
      return false;
    }
  };

  const resetPassword = async (token: string, password: string): Promise<boolean> => {
    try {
      const response = await api.post('/auth/reset-password', { token, password });
      
      // Save token to localStorage
      localStorage.setItem('auth_token', response.data.token);
      
      // Set the default Authorization header for all requests
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      
      setUser(response.data.user.username);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Reset password error:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      login, 
      logout, 
      forgotPassword, 
      resetPassword, 
      user, 
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
