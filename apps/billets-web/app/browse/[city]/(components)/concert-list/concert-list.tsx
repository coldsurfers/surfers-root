'use client'

import { apiClient } from '@/libs/openapi-client'
import { useQuery } from '@tanstack/react-query'

type ConcertListProps = {
  cityData: {
    readonly id: string
    readonly lat: number
    readonly lng: number
    readonly name: string
    readonly uiName: string
  }
}

export function ConcertList({ cityData }: ConcertListProps) {
  const { data, isLoading } = useQuery({
    queryKey: apiClient.concerts.queryKeys.getConcerts({
      offset: 0,
      size: 20,
      latitude: cityData.lat,
      longitude: cityData.lng,
    }),
    queryFn: () =>
      apiClient.concerts.getConcerts({
        offset: 0,
        size: 20,
        latitude: cityData.lat,
        longitude: cityData.lng,
      }),
  })
  return <div>ConcertList, {JSON.stringify(data)}</div>
}
