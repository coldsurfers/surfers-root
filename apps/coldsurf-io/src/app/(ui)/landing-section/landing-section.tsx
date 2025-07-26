'use client';

import type { PropsWithChildren } from 'react';
import { StyledLandingSection, StyledLandingSectionInnerContainer } from './landing-section.styled';

export function LandingSection({
  children,
  reversed = false,
  withoutInitialPaddingTop = false,
}: PropsWithChildren<{
  reversed?: boolean;
  withoutInitialPaddingTop?: boolean;
}>) {
  return (
    <StyledLandingSection $withoutInitialPaddingTop={withoutInitialPaddingTop}>
      <StyledLandingSectionInnerContainer $reversed={reversed}>
        {children}
      </StyledLandingSectionInnerContainer>
    </StyledLandingSection>
  );
}
