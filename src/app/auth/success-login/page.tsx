"use client"

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';

export default function SuccessLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signInWithGoogle } = useAuth(); // Remove checkAuthS, use any existing function

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token) {
      // Store the token
      localStorage.setItem('auth_token', token);
      
      // Redirect to homepage (authService will handle status check)
      router.push('/');
    } else {
      // No token, redirect to sign-in
      router.push('/sign-in');
    }
  }, [searchParams, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Completing sign-in...</p>
      </div>
    </div>
  );
}
