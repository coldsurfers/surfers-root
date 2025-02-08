import { AppLocale } from '@/lib/types/i18n'

export type PageProps<T = unknown> = {
  params: T & {
    locale: AppLocale
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export type I18nPathWithParams =
  | { pathname: '/filmlog' }
  | { pathname: '/soundlog' }
  | { pathname: '/squarelog' }
  | { pathname: '/techlog' }
  | { pathname: '/textlog' }
  | { pathname: '/filmlog/[slug]'; params: { slug: string } }
  | { pathname: '/soundlog/[slug]'; params: { slug: string } }
  | { pathname: '/squarelog/[slug]'; params: { slug: string } }
  | { pathname: '/techlog/[slug]'; params: { slug: string } }
  | { pathname: '/textlog/[slug]'; params: { slug: string } }
  | { pathname: '/about/[user]'; params: { user: string } }
  | { pathname: '/about' }
  | { pathname: '/tags/[tag]'; params: { tag: string } }
  | { pathname: '/tags' }
  | { pathname: '/404' }
  | { pathname: '/' }
