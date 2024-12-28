'use client'

import { StyledLandingText, StyledLandingTextContainer, StyledSmallLandingText } from './landing-text.styled'

export function LandingText() {
  return (
    <StyledLandingTextContainer>
      <StyledLandingText as="h1">Everything you need to live an artistic life.</StyledLandingText>
      <StyledSmallLandingText>
        {
          'No local venues anymore? You cannot grow your bands grown up in your locals?\nAfraid of disapearing artistic life?\nWe make products to support artists to live their own life.\nI am dedicated to contributing to the diversity of the music industry.\nMy mission is to help revitalize local-based performances and support generating revenue through music.'
        }
      </StyledSmallLandingText>
    </StyledLandingTextContainer>
  )
}
