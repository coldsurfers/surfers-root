import { I18nPathWithParams } from 'i18n/types'
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
