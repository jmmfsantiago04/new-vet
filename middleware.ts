import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const isAuthenticated = request.cookies.has('session')
    const session = isAuthenticated ? JSON.parse(request.cookies.get('session')!.value) : null
    const isAdmin = session?.role === 'admin'
    const pathname = request.nextUrl.pathname

    // If trying to access admin routes
    if (pathname.startsWith('/admin')) {
        if (!isAuthenticated) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
        if (!isAdmin) {
            return NextResponse.redirect(new URL('/cliente/dashboard', request.url))
        }
    }

    // If trying to access client routes
    if (pathname.startsWith('/cliente') && !isAuthenticated) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
}

// Configure which routes to protect
export const config = {
    matcher: ['/cliente/:path*', '/admin/:path*'],
} 