import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, LoginCredentials } from '../domain/entities/Auth';
import { ApiAuthRepository } from '../infrastructure/repositories/ApiAuthRepository';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  loginAsAdmin: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authRepo = new ApiAuthRepository();
const ADMIN_TOKEN_KEY = 'mindphoenix_admin_token';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem(ADMIN_TOKEN_KEY));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadUser() {
      const savedToken = localStorage.getItem(ADMIN_TOKEN_KEY);
      if (!savedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const me = await authRepo.getMe();
        setUser(me);
      } catch {
        // Fallback for offline/development if token is hhh session
        if (savedToken.includes('admin')) {
          setUser({
            id: 'user-admin-hhh',
            name: 'Administrator',
            email: 'hhh',
            role: 'Admin',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
            createdAt: new Date().toISOString(),
          });
        } else {
          localStorage.removeItem(ADMIN_TOKEN_KEY);
          setToken(null);
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const res = await authRepo.login(credentials);
      localStorage.setItem(ADMIN_TOKEN_KEY, res.token);
      setToken(res.token);
      setUser(res.user);
    } catch (err: any) {
      // Direct offline fallback for single admin account hhh/hhh
      if (credentials.email.trim() === 'hhh' && credentials.password === 'hhh') {
        const adminUser: User = {
          id: 'user-admin-hhh',
          name: 'Administrator',
          email: 'hhh',
          role: 'Admin',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
          createdAt: new Date().toISOString(),
        };
        const demoToken = 'mock-admin-token-' + Date.now();
        localStorage.setItem(ADMIN_TOKEN_KEY, demoToken);
        setToken(demoToken);
        setUser(adminUser);
        return;
      }
      throw err;
    }
  };

  const loginAsAdmin = async () => {
    await login({ email: 'hhh', password: 'hhh' });
  };

  const logout = async () => {
    try {
      await authRepo.logout();
    } finally {
      localStorage.removeItem(ADMIN_TOKEN_KEY);
      setToken(null);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, loginAsAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
