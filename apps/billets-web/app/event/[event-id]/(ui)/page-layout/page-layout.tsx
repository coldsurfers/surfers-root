'use client'

import { ReactNode } from 'react'
import { StyledPageLayout, StyledPosterContainer, StyledTopInfoContainer } from './page-layout.styled'

export function PageLayout({ poster, topInfo }: { poster: ReactNode; topInfo: ReactNode }) {
  return (
    <StyledPageLayout>
      <StyledPosterContainer>{poster}</StyledPosterContainer>
      <StyledTopInfoContainer>{topInfo}</StyledTopInfoContainer>
    </StyledPageLayout>
  )
}
