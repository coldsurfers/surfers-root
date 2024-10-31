import { useGetBilletsConcertQueryFn } from '@/features/billets'
import { queryKeys } from '@/libs/query-key-factory/query-key-factory'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { HomePageClient } from './page.client'

export default async function Home() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: queryKeys.billets.concerts.queryKey,
    queryFn: useGetBilletsConcertQueryFn,
  })

  const dehydratedState = JSON.parse(JSON.stringify(dehydrate(queryClient)))

  return (
    <HydrationBoundary state={dehydratedState}>
      <HomePageClient />
    </HydrationBoundary>
  )
}
