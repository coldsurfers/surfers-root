import { initialPageQuery } from '@/libs/openapi-client'
import { ApiErrorBoundaryRegistry } from '@/libs/registries'
import { getQueryClient } from '@/libs/utils/utils.query-client'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { RecentConcertList } from 'app/(components)'
import { PageLayout, PageTop } from './(ui)'
import { RouteLoading } from './(ui)/route-loading/route-loading'

export const dynamic = 'force-dynamic'

async function PageInner() {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(initialPageQuery.home())

  const dehydratedState = JSON.parse(JSON.stringify(dehydrate(queryClient)))

  return (
    <HydrationBoundary state={dehydratedState}>
      <PageLayout top={<PageTop />} bottomList={<RecentConcertList />} />
    </HydrationBoundary>
  )
}

export default async function Home() {
  return (
    <ApiErrorBoundaryRegistry>
      <RouteLoading>
        <PageInner />
      </RouteLoading>
    </ApiErrorBoundaryRegistry>
  )
}
