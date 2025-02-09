import { I18nPathWithParams } from 'i18n/types'
import { match } from 'ts-pattern'
import { SeriesCategory } from './types/series'

export const generateSeriesHref = ({
  seriesCategory,
  query,
}: {
  seriesCategory?: SeriesCategory
  query: { page?: number }
}): I18nPathWithParams => {
  if (!seriesCategory) {
    return {
      pathname: '/',
      query,
    }
  }
  return {
    pathname: '/[series]',
    params: {
      series: seriesCategory,
    },
    query,
  }
}

export const generateSeriesItemHref = (seriesCategory: SeriesCategory, slug: string): I18nPathWithParams => {
  return {
    pathname: '/[series]/[slug]',
    params: {
      series: seriesCategory,
      slug,
    },
  }
}

export const convertSeriesCategoryToTitle = (seriesCategory: SeriesCategory) => {
  return match(seriesCategory)
    .with('sound', () => 'YOU MUST LISTEN THIS')
    .with('tech', () => 'YOU MUST CODE THIS')
    .with('text', () => 'YOU MUST READ THIS')
    .with('video', () => 'YOU MUST WATCH THIS')
    .exhaustive()
}
