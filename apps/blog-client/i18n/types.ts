import { SeriesCategory } from '@/lib/types/series'

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
