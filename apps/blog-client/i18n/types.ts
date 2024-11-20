export type AppLocale = 'en' | 'ko'

export type PageProps<T = unknown> = {
  params: T & {
    locale: AppLocale
  }
}

export type I18nPathWithParams =
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
