import { getQueryClient } from '@/libs/utils/utils.query-client'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { queryKeyFactory } from '../(react-query)/react-query.key-factory'
import { TagsPageClient } from './page.client'

export const dynamic = 'force-static'

export default async function TagsPage() {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(queryKeyFactory.tags.list)

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <TagsPageClient />
    </HydrationBoundary>
  )
}
