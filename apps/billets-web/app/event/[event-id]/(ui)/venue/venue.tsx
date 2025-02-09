'use client'

import { Button } from '@coldsurfers/ocean-road'
import { GlobalLink } from 'app/(ui)'
import { memo, useMemo } from 'react'
import {
  CtaButtonWrapper,
  StyledIconButton,
  StyledVenueAddressContainer,
  StyledVenueAddressText,
  StyledVenueContainer,
  StyledVenueCopyIcon,
  StyledVenueTitleText,
} from './venue.styled'

type VenueProps = { address: string; id: string; latitude: number; longitude: number; venueTitle: string }

// 'https://maps.google.com/?q=The Shacklewell Arms, 71 Shacklewell Lane, London E8 2EB&ll=51.5531551,-0.0699228999999377'

export const Venue = memo(({ address, venueTitle, latitude, longitude, id }: VenueProps) => {
  const openInMapsHref = useMemo(() => {
    const url = `https://maps.google.com/?q=${venueTitle} ${address}&ll=${latitude},${longitude}`
    return encodeURI(url)
  }, [address, latitude, longitude, venueTitle])
  return (
    <StyledVenueContainer>
      <GlobalLink href={`/venue/${id}`}>
        <StyledVenueTitleText as="h3">{venueTitle}</StyledVenueTitleText>
      </GlobalLink>
      <StyledVenueAddressContainer>
        <StyledVenueAddressText as="p">{address}</StyledVenueAddressText>
        <StyledIconButton onClick={() => navigator.clipboard.writeText(address)}>
          <StyledVenueCopyIcon />
        </StyledIconButton>
      </StyledVenueAddressContainer>
      <CtaButtonWrapper>
        <GlobalLink href={openInMapsHref} target="_blank">
          <Button size="md" leftIcon="MapPin">
            OPEN IN MAPS
          </Button>
        </GlobalLink>
      </CtaButtonWrapper>
    </StyledVenueContainer>
  )
})
