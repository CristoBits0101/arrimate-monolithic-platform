// Auth
import authConfig from '@/lib/auth/auth.config'
import NextAuth from 'next-auth'

// Intl
import createMiddleware from 'next-intl/middleware'
import { routing } from '@/i18n/routing'

// Routes
import { API_AUTH_ROUTE, AUTH_ROUTES, PUBLIC_ROUTES } from '@/config/routes'

// Configuration
const { auth } = NextAuth(authConfig)
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

  // Redirect stories
  if (isLoggedIn && isAuthRoute) request.nextUrl.href = `${origin}/`

  // Redirect sign-in
  if (!isLoggedIn && !isPublicRoute) request.nextUrl.href = `${origin}/sign-in`

  // Apply language
  const response = intlMiddleware(request)

  // Return path
  return response
})

// Run middleware
export const config = {
  matcher: [
    '/',
    '/(en|es)',
    '/(en|es)/:path*',
    '/((?!.*\\.[\\w]+$|_next|api).*)',
    '/(trpc)(.*)'
  ]
}
