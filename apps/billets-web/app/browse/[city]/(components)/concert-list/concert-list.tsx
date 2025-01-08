'use client'

import { OpenApiError } from '@/libs/errors'
import { apiClient } from '@/libs/openapi-client'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { memo } from 'react'
import { ConcertListItem } from './concert-list-item'
import { StyledGridContainer, StyledListContainer, StyledListHeader, StyledListHeaderText } from './concert-list.styled'

type ConcertListProps = {
  cityData: {
    readonly id: string
    readonly lat: number
    readonly lng: number
    readonly name: string
    readonly uiName: string
  }
}

export const ConcertList = memo(({ cityData }: ConcertListProps) => {
  const { data } = useQuery<Awaited<ReturnType<typeof apiClient.concerts.getConcerts>>, OpenApiError>({
    queryKey: apiClient.concerts.queryKeys.getConcerts({
      offset: 0,
      size: 100,
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
    throwOnError: true,
  })

  return (
    <StyledListContainer>
      <StyledListHeader>
        <StyledListHeaderText as="h1">Upcoming Shows in {cityData.uiName}</StyledListHeaderText>
      </StyledListHeader>
      <StyledGridContainer>
        {data?.map((item) => {
          const poster = item.posters.at(0)
          const posterUrl = poster?.imageUrl
          const venue = item.venues.at(0)
          return (
            <ConcertListItem
              key={item.id}
              id={item.id}
              posterUrl={posterUrl}
              title={item.title}
              date={format(new Date(item.date), 'EEE, MMM d')}
              venueTitle={venue?.venueTitle}
            />
          )
        })}
      </StyledGridContainer>
    </StyledListContainer>
  )
})
