'use client';

import type { PropsWithChildren } from 'react';
import { StyledLandingSection, StyledLandingSectionInnerContainer } from './landing-section.styled';

export function LandingSection({
  children,
  reversed = false,
}: PropsWithChildren<{
  reversed?: boolean;
}>) {
  return (
    <StyledLandingSection>
      <StyledLandingSectionInnerContainer $reversed={reversed}>
        {children}
      </StyledLandingSectionInnerContainer>
    </StyledLandingSection>
  );
}
