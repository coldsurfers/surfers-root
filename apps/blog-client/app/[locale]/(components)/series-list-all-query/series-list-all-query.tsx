'use client'

import { queryKeyFactory } from '@/lib/react-query/react-query.key-factory'
import { AppLocale } from '@/lib/types/i18n'
import { SeriesItem } from '@/lib/types/series'
import { useQuery } from '@tanstack/react-query'
import { ReactNode, useMemo } from 'react'

export const SeriesListAllQuery = ({
  locale,
  children,
}: {
  locale: AppLocale
  children: (data: { postItems: SeriesItem[] }) => ReactNode
}) => {
  const allSeriesQuery = useQuery({
    ...queryKeyFactory.series.listAll(locale),
  })

  const postItems = useMemo(
    () =>
      (allSeriesQuery.data ?? [])
        .flat()
        .sort((a, b) => new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime()),
    [allSeriesQuery.data],
  )

  return <>{children({ postItems })}</>
}
