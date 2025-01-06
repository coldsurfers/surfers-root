'use client'

import { ReactNode } from 'react'
import {
  StyledPageLayout,
  StyledPosterContainer,
  StyledRightSideContainer,
  StyledTicketCTAContainer,
  StyledTopInfoContainer,
} from './page-layout.styled'

export function PageLayout({
  poster,
  topInfo,
  ticketCTA,
}: {
  poster: ReactNode
  topInfo: ReactNode
  ticketCTA: ReactNode
}) {
  return (
    <StyledPageLayout>
      <StyledPosterContainer>{poster}</StyledPosterContainer>
      <StyledRightSideContainer>
        <StyledTopInfoContainer>{topInfo}</StyledTopInfoContainer>
        <StyledTicketCTAContainer>{ticketCTA}</StyledTicketCTAContainer>
      </StyledRightSideContainer>
    </StyledPageLayout>
  )
}
