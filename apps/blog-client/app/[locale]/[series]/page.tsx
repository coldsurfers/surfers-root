'use client'

import { PAGINATION_PER_PAGE } from '@/lib/pagination.constants'
import { SeriesCategory } from '@/lib/types/series'
import { Pagination, PostPaginationList } from '@/ui'
import { PageProps } from 'i18n/types'
import { useSearchParams } from 'next/navigation'
import { SeriesListQuery } from './(component)'

export default function SeriesPage({
  params,
}: PageProps<{
  series: SeriesCategory
}>) {
  const searchParams = useSearchParams()
  const pageParam = searchParams.get('page')
  const page = pageParam ? Number(pageParam) : 1

  return (
    <SeriesListQuery appLocale={params.locale} seriesCategory={params.series}>
      {(data) => {
        return (
          <>
            <PostPaginationList postItems={data.postItems} page={page} />
            <Pagination
              currentPage={page}
              totalPage={Math.ceil(data.postItems.length / PAGINATION_PER_PAGE)}
              seriesCategory={params.series}
              appLocale={params.locale}
            />
          </>
        )
      }}
    </SeriesListQuery>
  )
}
