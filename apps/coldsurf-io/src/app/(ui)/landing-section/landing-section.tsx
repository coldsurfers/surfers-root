'use client'

import { PropsWithChildren } from 'react'
import { StyledLandingSection, StyledLandingSectionInnerContainer } from './landing-section.styled'

export function LandingSection({ children }: PropsWithChildren) {
  return (
    <StyledLandingSection>
      <StyledLandingSectionInnerContainer>{children}</StyledLandingSectionInnerContainer>
    </StyledLandingSection>
  )
}
