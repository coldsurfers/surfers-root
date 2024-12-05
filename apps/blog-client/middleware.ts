import type { ColorScheme } from '@coldsurfers/ocean-road'
import createMiddleware from 'next-intl/middleware'
import { NextRequest } from 'next/server'
import { routing } from './i18n/routing'

export default async function middleware(request: NextRequest) {
  // Step 1: Use the incoming request (example)
  // const defaultLocale = request.headers.get('x-your-custom-locale') || 'en'

  // Step 2: Create and call the next-intl middleware (example)
  const handleI18nRouting = createMiddleware(routing)
  const response = handleI18nRouting(request)

  // Step 3: Alter the response (example)
  // response.headers.set('x-your-custom-locale', defaultLocale)

  const colorScheme: ColorScheme =
    (request.cookies.get('color-scheme')?.value as 'light' | 'dark' | undefined) || 'light'
  response.cookies.set('color-scheme', colorScheme, {
    path: '/',
    sameSite: 'lax',
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production', // Set `Secure` in production
  })

  return response
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|ko)/:path*'],
}
