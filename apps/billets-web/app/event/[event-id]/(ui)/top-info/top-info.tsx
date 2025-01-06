'use client'

import { StyledFormattedDate, StyledTopInfoContainer, StyledTopInfoTitle, StyledVenueTitle } from './top-info.styled'

export function TopInfo({
  title,
  venueTitle,
  formattedDate,
}: {
  title: string
  venueTitle: string
  formattedDate: string
}) {
  return (
    <StyledTopInfoContainer>
      <StyledTopInfoTitle as="h1">{title}</StyledTopInfoTitle>
      <StyledVenueTitle as="h3">{venueTitle}</StyledVenueTitle>
      <StyledFormattedDate as="h3">{formattedDate}</StyledFormattedDate>
    </StyledTopInfoContainer>
  )
}
