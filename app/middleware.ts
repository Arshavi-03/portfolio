// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // If user is trying to access /portfolio directly
    if (request.nextUrl.pathname === '/portfolio') {
        // Redirect to home page
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/portfolio',
}