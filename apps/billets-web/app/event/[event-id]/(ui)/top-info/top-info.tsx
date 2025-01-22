'use client'

import Link from 'next/link'
import { StyledFormattedDate, StyledTopInfoContainer, StyledTopInfoTitle, StyledVenueTitle } from './top-info.styled'

export function TopInfo({
  title,
  venueTitle,
  formattedDate,
  venueId,
}: {
  title: string
  venueTitle: string
  formattedDate: string
  venueId: string
}) {
  return (
    <StyledTopInfoContainer>
      <StyledTopInfoTitle as="h1">{title}</StyledTopInfoTitle>
      <Link href={`/venue/${venueId}`}>
        <StyledVenueTitle as="h3">{venueTitle}</StyledVenueTitle>
      </Link>
      <StyledFormattedDate as="h3">{formattedDate}</StyledFormattedDate>
    </StyledTopInfoContainer>
  )
}
