import { createNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'

export type I18nPath =
  | { pathname: '/filmlog/[slug]'; params: { slug: string } }
  | { pathname: '/soundlog/[slug]'; params: { slug: string } }
  | { pathname: '/squarelog/[slug]'; params: { slug: string } }
  | { pathname: '/surflog/[slug]'; params: { slug: string } }
  | { pathname: '/techlog/[slug]'; params: { slug: string } }
  | { pathname: '/textlog/[slug]'; params: { slug: string } }
  | { pathname: '/writers' } // No params needed
  | { pathname: '/resume' }
  | { pathname: '/tags/[tag]'; params: { tag: string } }
  | { pathname: '/tags' }
  | { pathname: '/' }

export const i18nRoutingPathnames = {
  '/': '/',
  //
  '/surflog': '/surflog',
  '/techlog': '/techlog',
  '/filmlog': '/filmlog',
  '/soundlog': '/soundlog',
  '/squarelog': '/squarelog',
  '/textlog': '/textlog',
  //
  '/surflog/[slug]': '/surflog/[slug]',
  '/techlog/[slug]': '/techlog/[slug]',
  '/filmlog/[slug]': '/filmlog/[slug]',
  '/soundlog/[slug]': '/soundlog/[slug]',
  '/squarelog/[slug]': '/squarelog/[slug]',
  '/textlog/[slug]': '/textlog/[slug]',
  '/tags/[tag]': '/tags/[tag]',
  //
  '/writers': '/writers',
  '/resume': '/resume',
  '/tags': '/tags',
} as const
export type I18nRoutingPathnamesValue = (typeof i18nRoutingPathnames)[keyof typeof i18nRoutingPathnames]
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
