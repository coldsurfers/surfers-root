'use client';

import {
  StyledLandingText,
  StyledLandingTextContainer,
  StyledSmallLandingText,
} from './landing-text.styled';
import type { LandingTextProps } from './landing-text.types';

export function LandingText({ bigTitle, smallTitle }: LandingTextProps) {
  return (
    <StyledLandingTextContainer>
      <StyledLandingText as="h1">{bigTitle}</StyledLandingText>
      <StyledSmallLandingText>{smallTitle}</StyledSmallLandingText>
    </StyledLandingTextContainer>
  );
}
