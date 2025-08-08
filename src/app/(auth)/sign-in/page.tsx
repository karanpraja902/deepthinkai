"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { authService } from "@/lib/auth";
import { useAuth } from "@/components/AuthProvider";

const SignInPage = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {signInWithGoogle}=useAuth()

  const handleGoogleSignIn = async () => {
    console.log("handleGoogleSignIn");
    try {
      await signInWithGoogle();
    } catch (error) {
      setError("Google sign-in failed. Please try again.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const result = await authService.signIn(email, password);
      
      if (result.success) {
        router.push("/"); // Redirect to homepage instead of /chat
      } else {
        setError(result.error || "Invalid email or password");
      }
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20 animate-pulse"></div>
      
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-60" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.15'%3E%3Ccircle cx='30' cy='30' r='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      {/* Large floating elements */}
      <div className="absolute top-20 left-20 w-48 h-48 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-48 h-48 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-20 left-40 w-48 h-48 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse" style={{animationDelay: '4s'}}></div>
      
      {/* Medium decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply filter blur-lg opacity-40 animate-bounce" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-1/3 right-1/3 w-28 h-28 bg-yellow-200 rounded-full mix-blend-multiply filter blur-lg opacity-40 animate-bounce" style={{animationDelay: '3s'}}></div>
      
      {/* Small accent elements */}
      <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-green-200 rounded-full mix-blend-multiply filter blur-md opacity-30 animate-ping" style={{animationDelay: '0.5s'}}></div>
      <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-orange-200 rounded-full mix-blend-multiply filter blur-md opacity-30 animate-ping" style={{animationDelay: '2.5s'}}></div>
      
      {/* Geometric shapes */}
      <div className="absolute top-1/2 left-10 w-20 h-20 bg-cyan-200 rotate-45 mix-blend-multiply filter blur-lg opacity-30 animate-spin" style={{animationDuration: '20s'}}></div>
      <div className="absolute bottom-1/2 right-10 w-16 h-16 bg-violet-200 rotate-45 mix-blend-multiply filter blur-lg opacity-30 animate-spin" style={{animationDuration: '15s', animationDirection: 'reverse'}}></div>
      
      {/* Particle effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-1/2 w-2 h-2 bg-white rounded-full animate-ping" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-20 left-1/3 w-1 h-1 bg-white rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-30 left-2/3 w-1.5 h-1.5 bg-white rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-40 left-1/4 w-1 h-1 bg-white rounded-full animate-ping" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-50 left-3/4 w-2 h-2 bg-white rounded-full animate-ping" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-60 left-1/6 w-1.5 h-1.5 bg-white rounded-full animate-ping" style={{animationDelay: '5s'}}></div>
      </div>
      
      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="text-center">
          <Image 
            src="/deepthink-logo.svg" 
            alt="DeepThink Logo" 
            width={120} 
            height={120} 
            className="mx-auto"
          />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">DeepThink</h1>
          <h2 className="mt-2 text-lg text-gray-600">
            Sign in to your account
          </h2>
        </div>
        
                 <Card className="backdrop-blur-md bg-white/90 shadow-2xl border-0 ring-1 ring-white/20">
           <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                  {error}
                </div>
              )}
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    Forgot your password?
                  </a>
                </div>
              </div>

                             <div>
                 <button
                   type="submit"
                   disabled={isLoading}
                   className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                   {isLoading ? "Signing in..." : "Sign in"}
                 </button>
               </div>

               {/* Divider */}
               <div className="relative">
                 <div className="absolute inset-0 flex items-center">
                   <div className="w-full border-t border-gray-300" />
                 </div>
                 <div className="relative flex justify-center text-sm">
                   <span className="px-2 bg-white text-gray-500">Or continue with</span>
                 </div>
               </div>

               {/* Google Sign In */}
               <div>
                 <button
                   type="button"
                   onClick={handleGoogleSignIn}
                   className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                 >
                   <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                     <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                     <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                     <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                     <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                   </svg>
                   Sign in with Google
                 </button>
               </div>
            </form>
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/sign-up" className="font-medium text-blue-600 hover:text-blue-500">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignInPage;
