import { NextResponse } from 'next/server';

export function middleware(request: Request) {

  // Store current request url in a custom header, which you can read later
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set('pathname', request.url);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    }
  });
}
