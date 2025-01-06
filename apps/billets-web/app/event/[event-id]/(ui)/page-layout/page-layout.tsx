'use client'

import { ReactNode } from 'react'
import {
  StyledLineupContainer,
  StyledPageLayout,
  StyledPosterContainer,
  StyledRightSideContainer,
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
        <StyledLineupContainer>{lineup}</StyledLineupContainer>
        <StyledVenueContainer>{venue}</StyledVenueContainer>
      </StyledRightSideContainer>
    </StyledPageLayout>
  )
}
