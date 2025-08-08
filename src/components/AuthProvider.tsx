"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService, AuthState, User } from '@/lib/auth';

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (firstname: string, lastname: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);//createContext is a function that creates a new context object.

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};//useContext is a hook that returns the current context value for the given context object.

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false
  });//useState is a hook that returns a state variable and a function to update it.

  useEffect(() => {
    const unsubscribe = authService.subscribe((state) => {
      setAuthState(state);
    });//subscribe is a function that subscribes to the authService and updates the authState when the authService changes.

    return unsubscribe;
  }, []);//useEffect is a hook that runs a function when the component mounts.

  const signIn = async (email: string, password: string) => {
    return await authService.signIn(email, password);
  };//signIn is a function that signs in a user.

  const signUp = async (firstname: string, lastname: string, email: string, password: string) => {
    return await authService.signUp(firstname, lastname, email, password);
  };//signUp is a function that signs up a user.

  const signOut = async () => {
    await authService.signOut();
  };

  const value: AuthContextType = {
    ...authState,
    signIn,
    signUp,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
