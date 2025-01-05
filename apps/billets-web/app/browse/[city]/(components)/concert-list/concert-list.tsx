'use client'

import { apiClient } from '@/libs/openapi-client'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import Link from 'next/link'
import { memo } from 'react'
import {
  StyledGridContainer,
  StyledGridDate,
  StyledGridImage,
  StyledGridItem,
  StyledGridTextContainer,
  StyledGridTitle,
  StyledListContainer,
  StyledListHeader,
  StyledListHeaderText,
  StyledVenueText,
} from './concert-list.styled'

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
  const { data } = useQuery({
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

  return (
    <StyledListContainer>
      <StyledListHeader>
        <StyledListHeaderText as="h1">Popular Shows in {cityData.uiName}</StyledListHeaderText>
      </StyledListHeader>
      <StyledGridContainer>
        {data?.map((item) => {
          const poster = item.posters.at(0)
          const posterUrl = poster?.imageUrl
          const venue = item.venues.at(0)
          return (
            <Link key={item.id} href={`/concert-detail/${item.id}`}>
              <StyledGridItem>
                <StyledGridImage src={posterUrl} alt={item.title} />
                <StyledGridTextContainer>
                  <StyledGridTitle as="p">{item.title}</StyledGridTitle>
                  <StyledGridDate as="p">{format(new Date(item.date), 'EEE, MMM dd')}</StyledGridDate>
                  {venue?.venueTitle && <StyledVenueText as="p">{venue.venueTitle}</StyledVenueText>}
                </StyledGridTextContainer>
              </StyledGridItem>
            </Link>
          )
        })}
      </StyledGridContainer>
    </StyledListContainer>
  )
})
