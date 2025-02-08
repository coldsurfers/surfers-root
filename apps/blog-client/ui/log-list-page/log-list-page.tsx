'use client'

import { PAGINATION_PER_LINE, PAGINATION_PER_PAGE } from '@/lib/pagination.constants'
import { queryKeyFactory } from '@/lib/react-query/react-query.key-factory'
import { AppLocale } from '@/lib/types/i18n'
import { Series } from '@/lib/types/series'
import { PostItem, PostListContainer } from '@/ui'
import { useQuery } from '@tanstack/react-query'
import { memo, useMemo } from 'react'
import { Pagination } from '../../app/[locale]/(ui)/pagination'

type LogListPageProps = { locale: AppLocale; series: Series; page: number }

export const LogListPage = memo(({ locale, series, page }: LogListPageProps) => {
  const offset = useMemo(() => (page - 1) * PAGINATION_PER_PAGE, [page])
  const { data: seriesItems } = useQuery({
    ...queryKeyFactory.series.list({
      series,
      appLocale: locale,
    }),
  })

  const items = useMemo(() => seriesItems?.flat() ?? [], [seriesItems])

  return (
    <>
      <div style={{ marginTop: '6.5rem' }} />
      <PostListContainer>
        {items.slice(offset, offset + PAGINATION_PER_LINE).map((post) => (
          <PostItem key={post.id} {...post} />
        ))}
      </PostListContainer>
      <PostListContainer>
        {items.slice(offset + PAGINATION_PER_LINE, offset + PAGINATION_PER_LINE * 2).map((post) => (
          <PostItem key={post.id} {...post} />
        ))}
      </PostListContainer>
      <PostListContainer>
        {items.slice(offset + PAGINATION_PER_LINE * 2, offset + PAGINATION_PER_LINE * 3).map((post) => (
          <PostItem key={post.id} {...post} />
        ))}
      </PostListContainer>
      <Pagination currentPage={page} series={series} appLocale={locale} />
    </>
  )
})
