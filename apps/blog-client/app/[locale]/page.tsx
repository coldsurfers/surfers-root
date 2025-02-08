import { queryKeyFactory } from '@/lib/react-query/react-query.key-factory'
import { getQueryClient } from '@/lib/react-query/react-query.utils'
import { PageLayout } from '@/ui'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { routing } from 'i18n/routing'
import { PageProps } from 'i18n/types'
import { setRequestLocale } from 'next-intl/server'
import { Pagination } from './(ui)'
import { PostPaginationList } from './(ui)/post-pagination-list/post-pagination-list'

export const revalidate = 3600

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function RootPage({ params, searchParams }: PageProps) {
  const page = searchParams['page'] ? Number(searchParams['page']) : 1
  setRequestLocale(params.locale)

  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(queryKeyFactory.series.listAll(params.locale))

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <PageLayout>
        <PostPaginationList locale={params.locale} page={page} />
        <Pagination currentPage={page} series={null} appLocale={params.locale} />
      </PageLayout>
    </HydrationBoundary>
  )
}
