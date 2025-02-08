import { createNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'

export const i18nRoutingPathnames = {
  '/': '/',
  //
  '/[series]': '/[series]',
  //
  '/[series]/[slug]': '/[series]/[slug]',
  //
  '/tags': '/tags',
  '/tags/[tag]': '/tags/[tag]',
  //
  '/about': '/about',
  '/about/[user]': '/about/[user]',
  //
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
