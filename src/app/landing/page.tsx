"use client"

import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Temporarily comment out the redirect to test the page
    // if (isAuthenticated && !isLoading) {
    //   router.push('/chat');
    // }
  }, [isAuthenticated, isLoading, router]);

  // Temporarily skip loading check to see the page
  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
  //       <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20 animate-pulse"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-20 w-48 h-48 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-48 h-48 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-20 left-40 w-48 h-48 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse" style={{animationDelay: '4s'}}></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="mb-8">
            <Image 
              src="/deepthink-logo.svg" 
              alt="DeepThink Logo" 
              width={120} 
              height={120} 
              className="mx-auto mb-6"
            />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              DeepThink
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Your intelligent AI chat assistant that helps you think deeper, work smarter, and achieve more.
            </p>
          </div>
          {/* CTA Buttons */}
          <div className="inline-flex flex-col sm:flex-row gap-4 mb-8">
            <Link 
              href="/sign-in"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Sign In
            </Link>
            <Link 
              href="/sign-up"
              className="bg-white/90 backdrop-blur-md text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 border border-gray-200"
            >
              Create Account
            </Link>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Conversations</h3>
              <p className="text-gray-600">Engage in intelligent conversations with AI that understands context and provides thoughtful responses.</p>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Voice Input</h3>
              <p className="text-gray-600">Speak naturally with voice recognition technology for hands-free interaction.</p>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-gray-600">Your conversations are protected with enterprise-grade security and privacy measures.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500">
          <p className="text-sm">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
