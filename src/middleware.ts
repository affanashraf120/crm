import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { appraisal } from './utils/routes'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL(appraisal, request.url))
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/'
}