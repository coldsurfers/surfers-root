'use client'

import { memo } from 'react'

import { components } from 'types/api'
import { StyledLineupContainer, StyledLineupImage, StyledLineupNameText } from './lineup.styled'

export const LineupItem = memo(({ artist }: { artist: components['schemas']['ArtistDTOSchema'] }) => {
  const profileImageUrl = artist.thumbUrl
  const name = artist.name
  return (
    <StyledLineupContainer>
      <StyledLineupImage src={profileImageUrl ?? ''} alt={name} />
      <StyledLineupNameText as="p">{name}</StyledLineupNameText>
    </StyledLineupContainer>
  )
})
