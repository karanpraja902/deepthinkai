"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService, AuthState, User } from '@/lib/auth';

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (firstname: string, lastname: string, email: string, password: string, confirmpassword: string) => Promise<{ success: boolean; error?: string }>;
  signInWithGoogle: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false
  });

  useEffect(() => {
    const unsubscribe = authService.subscribe((state) => {
      setAuthState(state);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    return await authService.signIn(email, password);
  };

  const signUp = async (firstname: string, lastname: string, email: string, password: string, confirmpassword: string) => {
    return await authService.signUp(firstname, lastname, email, password, confirmpassword);
  };

  const signInWithGoogle = async () => {
    // Redirect to backend Google OAuth endpoint
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  const signOut = async () => {
    await authService.signOut();
  };

  const checkAuthStatus = async () => {
    await authService.checkAuthStatus();
  };

  const value: AuthContextType = {
    ...authState,
    signIn,
    signUp,
    signInWithGoogle,
    checkAuthStatus,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
