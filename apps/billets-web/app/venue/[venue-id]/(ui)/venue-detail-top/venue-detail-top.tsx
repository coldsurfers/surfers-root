'use client'

import { apiClient } from '@/libs/openapi-client'
import { useQuery } from '@tanstack/react-query'
import { VenueDetailTopTitleText } from './venue-detail-top.styled'

export function VenueDetailTop({ venueId }: { venueId: string }) {
  const { data: venueDetail } = useQuery({
    queryKey: apiClient.venue.queryKeys.detail(venueId),
    queryFn: () => apiClient.venue.getVenueDetail(venueId),
  })
  return (
    <>
      <VenueDetailTopTitleText as="h1">{venueDetail?.name}</VenueDetailTopTitleText>
    </>
  )
}
