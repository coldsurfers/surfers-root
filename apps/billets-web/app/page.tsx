import { useGetBilletsConcertQueryFn } from '@/features/billets'
import { queryKeys } from '@/libs/query-key-factory/query-key-factory'
import { RecentList } from '@/ui/recent-list/recent-list'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { PageLayout, PageTop } from './(ui)'

export default async function Home() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: queryKeys.billets.concerts.queryKey,
    queryFn: useGetBilletsConcertQueryFn,
  })

  const dehydratedState = JSON.parse(JSON.stringify(dehydrate(queryClient)))

  return (
    <HydrationBoundary state={dehydratedState}>
      <PageLayout top={<PageTop />} bottomList={<RecentList />} />
    </HydrationBoundary>
  )
}
