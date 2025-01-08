'use client'

import { Button } from '@coldsurfers/ocean-road'
import Link from 'next/link'
import { memo, useMemo } from 'react'
import {
  CtaButtonWrapper,
  MapPinIcon,
  OpenInMapsText,
  StyledIconButton,
  StyledVenueAddressContainer,
  StyledVenueAddressText,
  StyledVenueContainer,
  StyledVenueCopyIcon,
  StyledVenueTitleText,
} from './venue.styled'

type VenueProps = { address: string; id: string; latitude: number; longitude: number; venueTitle: string }

// 'https://maps.google.com/?q=The Shacklewell Arms, 71 Shacklewell Lane, London E8 2EB&ll=51.5531551,-0.0699228999999377'

export const Venue = memo(({ address, venueTitle, latitude, longitude }: VenueProps) => {
  const openInMapsHref = useMemo(() => {
    const url = `https://maps.google.com/?q=${venueTitle} ${address}&ll=${latitude},${longitude}`
    return encodeURI(url)
  }, [address, latitude, longitude, venueTitle])
  return (
    <StyledVenueContainer>
      <StyledVenueTitleText as="h3">{venueTitle}</StyledVenueTitleText>
      <StyledVenueAddressContainer>
        <StyledVenueAddressText as="p">{address}</StyledVenueAddressText>
        <StyledIconButton onClick={() => navigator.clipboard.writeText(address)}>
          <StyledVenueCopyIcon />
        </StyledIconButton>
      </StyledVenueAddressContainer>
      <CtaButtonWrapper>
        <Link href={openInMapsHref} target="_blank">
          <Button>
            <MapPinIcon />
            <OpenInMapsText as="span">OPEN IN MAPS</OpenInMapsText>
          </Button>
        </Link>
      </CtaButtonWrapper>
    </StyledVenueContainer>
  )
})
