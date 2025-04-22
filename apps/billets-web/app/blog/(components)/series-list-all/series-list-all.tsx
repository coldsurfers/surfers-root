'use client'

import { useQuery } from '@tanstack/react-query'
import { PAGINATION_PER_PAGE } from 'app/blog/(constants)'
import { queryKeyFactory } from 'app/blog/(react-query)/react-query.key-factory'
import { useMemo } from 'react'
import { Pagination } from '../pagination'
import { PostPaginationList } from '../post-pagination-list'

export const SeriesListAll = ({ page }: { page: number }) => {
  const allSeriesQuery = useQuery({
    ...queryKeyFactory.series.listAll('ko'),
  })

  const postItems = useMemo(
    () =>
      (allSeriesQuery.data ?? [])
        .flat()
        .filter((value) => value !== null)
        .sort((a, b) => new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime()),
    [allSeriesQuery.data],
  )

  return (
    <>
      <PostPaginationList postItems={postItems} page={page} />
      <Pagination
        currentPage={page}
        totalPage={Math.ceil(postItems.length / PAGINATION_PER_PAGE)}
        seriesCategory={null}
        appLocale={'ko'}
      />
    </>
  )
}
