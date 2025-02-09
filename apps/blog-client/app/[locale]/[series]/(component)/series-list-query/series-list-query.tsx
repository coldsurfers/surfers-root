'use client'

import { queryKeyFactory } from '@/lib/react-query/react-query.key-factory'
import { AppLocale } from '@/lib/types/i18n'
import { SeriesCategory, SeriesItem } from '@/lib/types/series'
import { useQuery } from '@tanstack/react-query'
import { ReactNode } from 'react'

export function SeriesListQuery({
  appLocale,
  seriesCategory,
  children,
}: {
  appLocale: AppLocale
  seriesCategory: SeriesCategory
  children: (data: { postItems: SeriesItem[] }) => ReactNode
}) {
  const { data } = useQuery(
    queryKeyFactory.series.list({
      appLocale,
      seriesCategory,
    }),
  )
  return <>{children({ postItems: data ?? [] })}</>
}
