'use client'
import { use } from 'react'

import { PAGINATION_PER_PAGE } from '@/lib/pagination.constants'
import { AppLocale } from '@/lib/types/i18n'
import { SeriesCategory } from '@/lib/types/series'
import { convertSeriesCategoryToTitle } from '@/lib/utils'
import { PageLayout, Pagination, PostPaginationList } from '@/ui'
import { useSearchParams } from 'next/navigation'
import { SeriesListQuery } from './(component)'

export default function SeriesPage(props: { params: Promise<{ series: SeriesCategory; locale: AppLocale }> }) {
  const params = use(props.params)
  const searchParams = useSearchParams()
  const pageParam = searchParams.get('page')
  const page = pageParam ? Number(pageParam) : 1

  return (
    <PageLayout title={convertSeriesCategoryToTitle(params.series)}>
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
    </PageLayout>
  )
}
