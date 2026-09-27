import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (role: UserRole) => void;
  loginWithCredentials: (email: string, password: string) => Promise<boolean>;
  loginWithOTP: (phone: string, otp: string) => Promise<boolean>;
  logout: () => void;
  sendOTP: (phone: string) => Promise<boolean>;
}

const demoUsers: Record<UserRole, User> = {
  farmer: {
    id: 'USR-F001',
    name: 'Rajesh Deshmukh',
    phone: '+91 98765 43210',
    email: 'rajesh.d@demo.oniontrust.ai',
    role: 'farmer',
    region: 'Nashik',
    status: 'active',
    avatar: '',
    createdAt: '2025-06-15T10:00:00Z',
  },
  procurement_officer: {
    id: 'USR-P001',
    name: 'Sahil Kamble',
    phone: '+91 98765 43211',
    email: 'sahil.k@demo.agromitra.ai',
    role: 'procurement_officer',
    region: 'Nashik',
    status: 'active',
    procurementCenter: 'Nashik Central',
    avatar: '',
    createdAt: '2025-03-10T10:00:00Z',
  },
  agricultural_expert: {
    id: 'USR-E001',
    name: 'Dr. Meena Kulkarni',
    phone: '+91 98765 43212',
    email: 'meena.k@demo.oniontrust.ai',
    role: 'agricultural_expert',
    region: 'Maharashtra',
    status: 'active',
    avatar: '',
    createdAt: '2025-01-20T10:00:00Z',
  },
  buyer: {
    id: 'USR-B001',
    name: 'Amit Sharma',
    phone: '+91 98765 43213',
    email: 'amit.s@demo.oniontrust.ai',
    role: 'buyer',
    region: 'Mumbai',
    status: 'active',
    avatar: '',
    createdAt: '2025-08-05T10:00:00Z',
  },
  admin: {
    id: 'USR-A001',
    name: 'Priya Joshi',
    phone: '+91 98765 43214',
    email: 'priya.j@demo.oniontrust.ai',
    role: 'admin',
    region: 'Maharashtra',
    status: 'active',
    avatar: '',
    createdAt: '2024-12-01T10:00:00Z',
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('oniontrust_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback((role: UserRole) => {
    const demoUser = demoUsers[role];
    setUser(demoUser);
    localStorage.setItem('oniontrust_user', JSON.stringify(demoUser));
    localStorage.setItem('oniontrust_token', `demo-jwt-token-${role}-${Date.now()}`);
  }, []);

  const loginWithCredentials = useCallback(async (_email: string, _password: string): Promise<boolean> => {
    // Mock: accept any credentials, default to officer role
    await new Promise(r => setTimeout(r, 800));
    login('procurement_officer');
    return true;
  }, [login]);

  const loginWithOTP = useCallback(async (_phone: string, _otp: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 800));
    login('farmer');
    return true;
  }, [login]);

  const sendOTP = useCallback(async (_phone: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 500));
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('oniontrust_user');
    localStorage.removeItem('oniontrust_token');
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      loginWithCredentials,
      loginWithOTP,
      logout,
      sendOTP,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export { demoUsers };
