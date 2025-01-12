'use client'

import { memo } from 'react'

import { apiClient } from '@/libs/openapi-client'
import { useQuery } from '@tanstack/react-query'
import { components } from 'types/api'
import { StyledLineupContainer, StyledLineupImage, StyledLineupNameText } from './lineup.styled'

export const LineupItem = memo(({ artist }: { artist: components['schemas']['ArtistDTOSchema'] }) => {
  const { data: profileImages } = useQuery({
    queryKey: apiClient.artistProfileImage.queryKeys.list.byArtistId(artist.id),
    queryFn: () => apiClient.artistProfileImage.getArtistProfileImagesByArtistId(artist.id),
  })
  const mainProfileImage = profileImages?.at(0)
  const profileImageUrl = mainProfileImage?.url
  const name = artist.name
  return (
    <StyledLineupContainer>
      <StyledLineupImage src={profileImageUrl} alt={name} />
      <StyledLineupNameText as="p">{name}</StyledLineupNameText>
    </StyledLineupContainer>
  )
})
