'use client'

import { ReactNode } from 'react'
import {
  StyledLineupContainer,
  StyledPageLayout,
  StyledPosterContainer,
  StyledRightSideContainer,
  StyledSectionHeaderText,
  StyledTicketCTAContainer,
  StyledTopInfoContainer,
  StyledVenueContainer,
} from './page-layout.styled'

export function PageLayout({
  poster,
  topInfo,
  ticketCTA,
  lineup,
  venue,
}: {
  poster: ReactNode
  topInfo: ReactNode
  ticketCTA: ReactNode
  lineup: ReactNode
  venue: ReactNode
}) {
  return (
    <StyledPageLayout>
      <StyledPosterContainer>{poster}</StyledPosterContainer>
      <StyledRightSideContainer>
        <StyledTopInfoContainer>{topInfo}</StyledTopInfoContainer>
        <StyledTicketCTAContainer>{ticketCTA}</StyledTicketCTAContainer>
        <StyledLineupContainer>
          <StyledSectionHeaderText as="h3">Lineup</StyledSectionHeaderText>
          {lineup}
        </StyledLineupContainer>
        <StyledVenueContainer>
          <StyledSectionHeaderText as="h3">Venue</StyledSectionHeaderText>
          {venue}
        </StyledVenueContainer>
      </StyledRightSideContainer>
    </StyledPageLayout>
  )
}
