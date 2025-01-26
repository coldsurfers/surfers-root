import { apiClient } from '@/libs/openapi-client'
import { ApiErrorBoundaryRegistry } from '@/libs/registries'
import { getQueryClient } from '@/libs/utils/utils.query-client'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { RouteLoading } from 'app/(ui)'
import { redirect } from 'next/navigation'
import { cache } from 'react'
import { VenueDetailAbout, VenueDetailEventList, VenueDetailPageLayout, VenueDetailTop } from './(ui)'

const getVenueDetail = cache((venueId: string) => apiClient.venue.getVenueDetail(venueId))

async function validateVenue(venueId: string) {
  try {
    const response = await getVenueDetail(venueId)
    return {
      isValid: true,
      data: response,
    }
  } catch (e) {
    return {
      isValid: false,
      data: null,
    } as const
  }
}

async function PageInner({ params }: { params: { ['venue-id']: string } }) {
  const venueId = params['venue-id']

  const validation = await validateVenue(venueId)

  if (!validation.isValid) {
    return redirect('/404')
  }

  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: apiClient.venue.queryKeys.detail(venueId),
    queryFn: () => getVenueDetail(venueId),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <VenueDetailPageLayout>
        <VenueDetailTop venueId={venueId} />
        <VenueDetailEventList venueId={venueId} />
        <VenueDetailAbout venueId={venueId} />
      </VenueDetailPageLayout>
    </HydrationBoundary>
  )
}

export default async function VenueDetailPage({ params }: { params: Promise<{ ['venue-id']: string }> }) {
  return (
    <ApiErrorBoundaryRegistry>
      <RouteLoading>
        <PageInner params={await params} />
      </RouteLoading>
    </ApiErrorBoundaryRegistry>
  )
}
