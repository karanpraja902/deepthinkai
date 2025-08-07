"use client"

import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RootPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        // If user is authenticated, redirect to the main app
        router.push('/chat');
      } else {
        // If user is not authenticated, redirect to landing page
        router.push('/landing');
      }
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading spinner while checking auth status
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
    </div>
  );
}
