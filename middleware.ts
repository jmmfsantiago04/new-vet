import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const isAuthenticated = request.cookies.has('session')

    // If the user is not authenticated and trying to access protected routes
    if (!isAuthenticated && request.nextUrl.pathname.startsWith('/cliente')) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
}

// Configure which routes to protect
export const config = {
    matcher: '/cliente/:path*',
} 