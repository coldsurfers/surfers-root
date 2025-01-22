'use client'

import { apiClient } from '@/libs/openapi-client'
import { useQuery } from '@tanstack/react-query'

export function VenueDetailAbout({ venueId }: { venueId: string }) {
  const { data: venueDetail, isLoading: isLoadingVenueDetail } = useQuery({
    queryKey: apiClient.venue.queryKeys.detail(venueId),
    queryFn: () => apiClient.venue.getVenueDetail(venueId),
  })

  return (
    <div>
      <p>{venueDetail?.address}</p>
    </div>
  )
}
