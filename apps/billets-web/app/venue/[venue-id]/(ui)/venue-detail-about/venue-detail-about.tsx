'use client'

import { initialPageQuery } from '@/libs/openapi-client'
import { useQuery } from '@tanstack/react-query'
import { StyledTitleText } from './venue-detail-about.styled'

export function VenueDetailAbout({ venueId }: { venueId: string }) {
  const { data: venueDetail } = useQuery(initialPageQuery.venueDetail(venueId))

  return (
    <>
      <StyledTitleText as="h2">About</StyledTitleText>
      <StyledTitleText>{venueDetail?.address}</StyledTitleText>
    </>
  )
}
