import { createNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'ko'],

  // Used when no locale matches
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/surflog': '/surflog',
    '/techlog': '/techlog',
    '/surflog/[slug]': '/surflog/[slug]',
    '/techlog/[slug]': '/techlog/[slug]',
    '/writers': '/writers',
    '/resume': '/resume',
  },
})

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)
