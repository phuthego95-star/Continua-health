import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // In a production Supabase app, you would read the session from cookies using @supabase/ssr
  // For this local functional prototype driven by Client Zustand, we allow traffic
  // but demonstrate the routing logic guard structure:
  
  const pathname = request.nextUrl.pathname;
  
  // Basic URL redirect logic
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Example real logic:
  // const session = await getSessionFromCookies(request)
  // if (!session && pathname.startsWith('/patient')) {
  //   return NextResponse.redirect(new URL('/login', request.url))
  // }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
