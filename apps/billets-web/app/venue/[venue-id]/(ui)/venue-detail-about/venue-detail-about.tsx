'use client'

import { apiClient } from '@/libs/openapi-client'
import { useQuery } from '@tanstack/react-query'
import { StyledTitleText } from './venue-detail-about.styled'

export function VenueDetailAbout({ venueId }: { venueId: string }) {
  const { data: venueDetail } = useQuery({
    queryKey: apiClient.venue.queryKeys.detail(venueId),
    queryFn: () => apiClient.venue.getVenueDetail(venueId),
  })

  return (
    <>
      <StyledTitleText as="h2">About</StyledTitleText>
      <StyledTitleText>{venueDetail?.address}</StyledTitleText>
    </>
  )
}
