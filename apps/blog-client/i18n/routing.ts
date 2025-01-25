import { createNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'

export const i18nRoutingPathnames = {
  '/': '/',
  //
  '/techlog': '/techlog',
  '/filmlog': '/filmlog',
  '/soundlog': '/soundlog',
  '/squarelog': '/squarelog',
  '/textlog': '/textlog',
  //
  '/techlog/[slug]': '/techlog/[slug]',
  '/filmlog/[slug]': '/filmlog/[slug]',
  '/soundlog/[slug]': '/soundlog/[slug]',
  '/squarelog/[slug]': '/squarelog/[slug]',
  '/textlog/[slug]': '/textlog/[slug]',
  '/tags/[tag]': '/tags/[tag]',
  //
  '/about': '/about',
  '/about/[user]': '/about/[user]',
  '/tags': '/tags',
  '/404': '/404',
} as const

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'ko'],

  // Used when no locale matches
  defaultLocale: 'en',
  pathnames: i18nRoutingPathnames,
})

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)
