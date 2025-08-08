import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;
  
  // Get the token from cookies
  const token = request.cookies.get('auth_token')?.value;

  console.log(token, "here is token coming")
  
  // Define public routes that don't require authentication
  const publicRoutes = ['/landing', '/sign-in', '/sign-up'];
  
  // Define the homepage route
  const homepageRoute = '/';
  
  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.includes(path);
  
  // If token is present and trying to access public routes
  if (token && isPublicRoute) {
    // Redirect to homepage
    const homepageUrl = new URL(homepageRoute, request.url);
    return NextResponse.redirect(homepageUrl);
  }
  
  // If no token is present and trying to access protected route
  if (!token && !isPublicRoute) {
    // Redirect to landing page
    const landingUrl = new URL('/landing', request.url);
    return NextResponse.redirect(landingUrl);
  }
  
  // Continue with the request
  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};