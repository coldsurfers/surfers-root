'use client'

import { memo } from 'react'
import {
  StyledIconButton,
  StyledVenueAddressContainer,
  StyledVenueAddressText,
  StyledVenueContainer,
  StyledVenueCopyIcon,
  StyledVenueTitleText,
} from './venue.styled'

type VenueProps = { address: string; id: string; latitude: number; longitude: number; venueTitle: string }

export const Venue = memo(({ address, venueTitle }: VenueProps) => {
  return (
    <StyledVenueContainer>
      <StyledVenueTitleText as="h3">{venueTitle}</StyledVenueTitleText>
      <StyledVenueAddressContainer>
        <StyledVenueAddressText as="p">{address}</StyledVenueAddressText>
        <StyledIconButton onClick={() => navigator.clipboard.writeText(address)}>
          <StyledVenueCopyIcon />
        </StyledIconButton>
      </StyledVenueAddressContainer>
    </StyledVenueContainer>
  )
})
