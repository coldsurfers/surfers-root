'use client';

import { StyledHomeTop, StyledHomeWrapper } from './page-layout.styled';
import type { HomePageLayoutProps } from './page-layout.types';

export function PageLayout({ top, children }: HomePageLayoutProps) {
  return (
    <StyledHomeWrapper>
      <StyledHomeTop>{top}</StyledHomeTop>
      {children}
    </StyledHomeWrapper>
  );
}
