'use client'

import { initialPageQuery } from '@/libs/openapi-client'
import { useQuery } from '@tanstack/react-query'
import { VenueDetailTopTitleText } from './venue-detail-top.styled'

export function VenueDetailTop({ venueId }: { venueId: string }) {
  const { data: venueDetail } = useQuery(initialPageQuery.venueDetail(venueId))
  return (
    <>
      <VenueDetailTopTitleText as="h1">{venueDetail?.name}</VenueDetailTopTitleText>
    </>
  )
}
