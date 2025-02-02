import { initialPageQuery } from '@/libs/openapi-client'
import { getQueryClient } from '@/libs/utils/utils.query-client'
import { HydrationBoundary } from '@tanstack/react-query'
import { ReactNode } from 'react'

export const dynamic = 'force-dynamic'

async function LayoutInner({
  children,
  eventCategory,
  city,
}: {
  children: ReactNode
  eventCategory: string
  city: string
}) {
  const queryClient = getQueryClient()

  await queryClient.prefetchInfiniteQuery(
    initialPageQuery.browseEvents({ cityId: city, eventCategoryName: eventCategory }),
  )
  return <HydrationBoundary>{children}</HydrationBoundary>
}

export default function BrowseByCityEventCategoryLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { ['event-category']: string }
}) {
  const eventCategory = params['event-category']
  return <LayoutInner eventCategory={eventCategory}>{children}</LayoutInner>
}
