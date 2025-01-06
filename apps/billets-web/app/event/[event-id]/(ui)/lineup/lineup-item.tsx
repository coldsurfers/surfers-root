'use client'

import { memo } from 'react'

import { StyledLineupContainer, StyledLineupImage, StyledLineupNameText } from './lineup.styled'

export const LineupItem = memo(
  ({ id, name, profileImageUrl }: { profileImageUrl: string; name: string; id: string }) => {
    return (
      <StyledLineupContainer key={id}>
        <StyledLineupImage src={profileImageUrl} alt={name} />
        <StyledLineupNameText as="p">{name}</StyledLineupNameText>
      </StyledLineupContainer>
    )
  },
)
