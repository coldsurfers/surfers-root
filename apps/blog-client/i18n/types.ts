export type AppLocale = 'en' | 'ko'

export type PageProps<T = unknown> = {
  params: T & {
    locale: AppLocale
  }
}
