"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

const SignInPage = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      // Add your authentication logic here
      console.log("Signing in with:", { email, password });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to dashboard or home page
      router.push("/");
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
