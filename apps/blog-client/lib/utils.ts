import { I18nPathWithParams } from 'i18n/types'
import { match } from 'ts-pattern'
import { Series } from './types/series'

export const generateSeriesHref = ({
  series,
  query,
}: {
  series?: Series
  query: { page?: number }
}): I18nPathWithParams => {
  return match<Series | undefined, I18nPathWithParams>(series)
    .with('YMWT', () => ({
      pathname: '/filmlog',
      query,
    }))
    .with('YMLT', () => ({
      pathname: '/soundlog',
      query,
    }))
    .with('YMCT', () => ({
      pathname: '/techlog',
      query,
    }))
    .with('YMRT', () => ({
      pathname: '/textlog',
      query,
    }))
    .otherwise(() => ({
      pathname: '/',
      query,
    }))
}

export const generateSeriesItemHref = (series: Series, slug: string): I18nPathWithParams => {
  return match<Series, I18nPathWithParams>(series)
    .with('YMWT', () => ({
      pathname: '/filmlog/[slug]',
      params: {
        slug,
      },
    }))
    .with('YMLT', () => ({
      pathname: '/soundlog/[slug]',
      params: {
        slug,
      },
    }))
    .with('YMCT', () => ({
      pathname: '/techlog/[slug]',
      params: {
        slug,
      },
    }))
    .with('YMRT', () => ({
      pathname: '/textlog/[slug]',
      params: {
        slug,
      },
    }))
    .exhaustive()
}
