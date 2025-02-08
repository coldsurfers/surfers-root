import { AppLocale } from '@/lib/types/i18n'
import { SeriesCategory } from '@/lib/types/series'

export type PageProps<T = unknown> = {
  params: T & {
    locale: AppLocale
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

type PageQuery = { page?: number }

export type I18nPathWithParams =
  | { pathname: '/[series]'; params: { series: SeriesCategory }; query?: PageQuery }
  | { pathname: '/[series]/[slug]'; params: { series: SeriesCategory; slug: string } }
  | { pathname: '/about/[user]'; params: { user: string } }
  | { pathname: '/about' }
  | { pathname: '/tags/[tag]'; params: { tag: string } }
  | { pathname: '/tags' }
  | { pathname: '/404' }
  | { pathname: '/'; query?: PageQuery }
