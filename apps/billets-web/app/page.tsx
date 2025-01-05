import { apiClient } from '@/libs/openapi-client'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { RecentConcertList } from 'app/(components)'
import { PageLayout, PageTop } from './(ui)'

export const revalidate = 3600

export default async function Home() {
  const queryClient = new QueryClient()

  try {
    await queryClient.prefetchQuery({
      queryKey: apiClient.concerts.queryKeys.getConcerts({ offset: 0, size: 20 }),
      queryFn: () =>
        apiClient.concerts.getConcerts({
          offset: 0,
          size: 20,
        }),
    })
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
