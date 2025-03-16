'use client'

import { memo, useMemo } from 'react'

import { components } from 'types/api'
import {
  StyledLineupContainer,
  StyledLineupImage,
  StyledLineupImageEmptyText,
  StyledLineupImageWrapper,
  StyledLineupNameText,
} from './lineup.styled'

export const LineupItem = memo(({ artist }: { artist: components['schemas']['ArtistDTOSchema'] }) => {
  const profileImageUrl = useMemo(() => {
    if (!artist.thumbUrl) {
      return ''
    }
    return `${artist.thumbUrl}&width=80&height=80`
  }, [artist.thumbUrl])
  const name = artist.name
  return (
    <StyledLineupContainer href={`/artist/${artist.id}`}>
      <StyledLineupImageWrapper>
        {profileImageUrl ? (
          <StyledLineupImage src={profileImageUrl} alt={name} />
        ) : (
          <StyledLineupImageEmptyText>{artist.name.at(0)}</StyledLineupImageEmptyText>
        )}
      </StyledLineupImageWrapper>
      <StyledLineupNameText as="p">{name}</StyledLineupNameText>
    </StyledLineupContainer>
  )
})
