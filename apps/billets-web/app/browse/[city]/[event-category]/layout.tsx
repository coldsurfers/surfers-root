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
    initialPageQuery.browseEvents({ cityName: city, eventCategoryName: eventCategory }),
  )
  return <HydrationBoundary>{children}</HydrationBoundary>
}

export default function BrowseByCityEventCategoryLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { ['event-category']: string; city: string }
}) {
  const eventCategory = params['event-category']
  const city = params['city']
  return (
    <LayoutInner eventCategory={eventCategory} city={city}>
      {children}
    </LayoutInner>
  )
}
