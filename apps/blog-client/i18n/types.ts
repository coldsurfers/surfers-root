import { AppLocale } from '@/lib/types/i18n'

export type PageProps<T = unknown> = {
  params: T & {
    locale: AppLocale
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

type PageQuery = { page?: number }

export type I18nPathWithParams =
  | { pathname: '/filmlog'; query?: PageQuery }
  | { pathname: '/soundlog'; query?: PageQuery }
  | { pathname: '/techlog'; query?: PageQuery }
  | { pathname: '/textlog'; query?: PageQuery }
  | { pathname: '/filmlog/[slug]'; params: { slug: string } }
  | { pathname: '/soundlog/[slug]'; params: { slug: string } }
  | { pathname: '/techlog/[slug]'; params: { slug: string } }
  | { pathname: '/textlog/[slug]'; params: { slug: string } }
  | { pathname: '/about/[user]'; params: { user: string } }
  | { pathname: '/about' }
  | { pathname: '/tags/[tag]'; params: { tag: string } }
  | { pathname: '/tags' }
  | { pathname: '/404' }
  | { pathname: '/'; query?: PageQuery }
