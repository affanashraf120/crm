import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  // Check if the request is for the root path
  if (url.pathname === '/') {
    // Redirect to the dashboard page
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Store current request url in a custom header, which you can read later
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set('pathname', request.url);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    }
  });
}

export const config = {
  matcher: ['/', '/your-other-paths'] // Add other paths if needed
}
