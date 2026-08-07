'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type UserRole = 'guest' | 'client' | 'admin';

export interface UserSession {
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: UserSession | null;
  role: UserRole;
  loginAsClient: (email: string, name: string) => void;
  loginAsAdmin: (password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'warung_marjukis_auth_session';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load auth session:', e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  const loginAsClient = (email: string, name: string) => {
    const session: UserSession = {
      name: name || 'Pelanggan Setia',
      email,
      role: 'client',
    };
    setUser(session);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  };

  const loginAsAdmin = (password: string): boolean => {
    // Admin password check (Default: adminmarjukis or admin123)
    if (password === 'adminmarjukis' || password === 'admin123') {
      const session: UserSession = {
        name: 'Ibu Yulia (Pemilik)',
        email: 'admin@warungmarjukis.com',
        role: 'admin',
      };
      setUser(session);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const role: UserRole = user ? user.role : 'guest';
  const isAuthenticated = Boolean(user);

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loginAsClient,
        loginAsAdmin,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
