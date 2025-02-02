import { initialPageQuery } from '@/libs/openapi-client'
import { ApiErrorBoundaryRegistry } from '@/libs/registries'
import { getQueryClient } from '@/libs/utils/utils.query-client'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { RouteLoading } from 'app/(ui)'
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
    initialPageQuery.browseEvents({ cityName: city, eventCategoryName: eventCategory.toLowerCase() }),
  )

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>
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
    <ApiErrorBoundaryRegistry>
      <RouteLoading>
        <LayoutInner eventCategory={eventCategory} city={city}>
          {children}
        </LayoutInner>
      </RouteLoading>
    </ApiErrorBoundaryRegistry>
  )
}
