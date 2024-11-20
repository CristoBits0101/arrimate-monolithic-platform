// next-auth
import authConfig from '@/lib/auth.config'
import NextAuth from 'next-auth'

// next-intl
import createMiddleware from 'next-intl/middleware'
import { routing } from '@/i18n/routing'

// config/routes
import { API_AUTH_ROUTE, AUTH_ROUTES, PUBLIC_ROUTES } from '@/config/routes'
import { NextResponse } from 'next/server'

//
const { auth } = NextAuth(authConfig)

// Language routing
const intlMiddleware = createMiddleware(routing)

export default auth((request) => {
  // Get origin
  const origin = request.nextUrl.origin

  // Get pathname
  const pathname = request.nextUrl.pathname

  // Check login
  const isLoggedIn = !!request.auth

  // Check routes
  const isApiAuthRoute = pathname.startsWith(API_AUTH_ROUTE)
  const isAuthRoute = AUTH_ROUTES.includes(pathname)
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname)

  // Check API
  if (isApiAuthRoute) return

  // Redirect home
  if (isLoggedIn && isAuthRoute) return NextResponse.redirect(new URL('/', origin))

  // Redirect sign-in
  if (!isLoggedIn && !isPublicRoute) return NextResponse.redirect(new URL('/sign-in', origin))

  // Apply language
  const response = intlMiddleware(request)

  return response
})

// Run middleware
export const config = {
  matcher: [
    '/',
    '/(en|es)',
    '/(en|es)/:path*',
    '/((?!.*\\.[\\w]+$|_next).*)',
    '/(api|trpc)(.*)'
  ]
}
