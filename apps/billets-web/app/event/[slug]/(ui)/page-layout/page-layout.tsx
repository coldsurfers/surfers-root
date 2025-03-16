'use client'

import { ReactNode } from 'react'
import {
  StyledPageLayout,
  StyledPosterContainer,
  StyledRightSideContainer,
  StyledSectionContainer,
  StyledSectionHeaderText,
  StyledTicketCTAContainer,
  StyledTopInfoContainer,
} from './page-layout.styled'

export function PageLayout({
  poster,
  topInfo,
  ticketCTA,
  lineup,
  venue,
  downloadApp,
}: {
  poster: ReactNode
  topInfo: ReactNode
  ticketCTA: ReactNode
  lineup: ReactNode | null
  venue: ReactNode
  downloadApp: ReactNode
}) {
  return (
    <StyledPageLayout>
      <StyledPosterContainer>{poster}</StyledPosterContainer>
      <StyledRightSideContainer>
        <StyledTopInfoContainer>{topInfo}</StyledTopInfoContainer>
        <StyledTicketCTAContainer>{ticketCTA}</StyledTicketCTAContainer>
        {lineup && (
          <StyledSectionContainer>
            <StyledSectionHeaderText as="h3">Lineup</StyledSectionHeaderText>
            {lineup}
          </StyledSectionContainer>
        )}
        <StyledSectionContainer>
          <StyledSectionHeaderText as="h3">Venue</StyledSectionHeaderText>
          {venue}
        </StyledSectionContainer>
        <StyledSectionContainer>
          <StyledSectionHeaderText as="h3">Download the Billets app</StyledSectionHeaderText>
          {downloadApp}
        </StyledSectionContainer>
      </StyledRightSideContainer>
    </StyledPageLayout>
  )
}
