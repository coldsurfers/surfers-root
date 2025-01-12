'use client'

import { OpenApiError } from '@/libs/errors'
import { apiClient } from '@/libs/openapi-client'
import { useQuery } from '@tanstack/react-query'
import { memo } from 'react'
import { components } from 'types/api'
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
  const { data } = useQuery<components['schemas']['ConcertDTOSchema'][], OpenApiError>({
    queryKey: apiClient.concert.queryKeys.list.byLocation({
      offset: 0,
      size: 100,
      latitude: cityData.lat,
      longitude: cityData.lng,
    }),
    queryFn: () =>
      apiClient.concert.getConcerts({
        offset: 0,
        size: 100,
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
      <StyledGridContainer>{data?.map((item) => <ConcertListItem key={item.id} concert={item} />)}</StyledGridContainer>
    </StyledListContainer>
  )
})
