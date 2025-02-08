'use client'

import { PAGINATION_PER_PAGE } from '@/lib/pagination.constants'
import { Pagination, PostPaginationList } from '@/ui'
import { PageProps } from 'i18n/types'
import { useSearchParams } from 'next/navigation'
import { SeriesListAllQuery } from './(components)'

export default async function RootPage({ params }: PageProps) {
  const searchParams = useSearchParams()
  const pageParam = searchParams.get('page')
  const page = pageParam ? Number(pageParam) : 1

  return (
    <SeriesListAllQuery locale={params.locale}>
      {(data) => {
        return (
          <>
            <PostPaginationList postItems={data.postItems} page={page} />
            <Pagination
              currentPage={page}
              totalPage={Math.ceil(data.postItems.length / PAGINATION_PER_PAGE)}
              series={null}
              appLocale={params.locale}
            />
          </>
        )
      }}
    </SeriesListAllQuery>
  )
}
