"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader } from '@/components/Loader';

export default function SuccessLoginPage() {
  const router = useRouter();

  useEffect(() => {
    // This page will automatically redirect to home after the API route sets the cookie
    // The API route handles the redirect, so this is just a fallback
    const timer = setTimeout(() => {
      router.push('/');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Loader type="default" position="center" />
        <h2 className="mt-4 text-xl font-semibold text-gray-700">
          Logging you in...
        </h2>
        <p className="mt-2 text-gray-500">
          Please wait while we complete your authentication.
        </p>
      </div>
    </div>
  );
}
