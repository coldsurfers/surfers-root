import { initialPageQuery } from '@/libs/openapi-client'
import { getQueryClient } from '@/libs/utils/utils.query-client'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { RecentConcertList } from 'app/(components)'
import { PageLayout, PageTop } from './(ui)'

export const revalidate = 600

export default async function Home() {
  const queryClient = getQueryClient()

  try {
    await queryClient.prefetchQuery(initialPageQuery.home())
  } catch (e) {
    console.error(e)
  }

  const dehydratedState = JSON.parse(JSON.stringify(dehydrate(queryClient)))

  return (
    <HydrationBoundary state={dehydratedState}>
      <PageLayout top={<PageTop />} bottomList={<RecentConcertList />} />
    </HydrationBoundary>
  )
}
