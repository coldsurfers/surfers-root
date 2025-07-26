'use client';

import { StyledHomeTop, StyledHomeWrapper } from './page-layout.styled';
import type { PageLayoutProps } from './page-layout.types';

export function PageLayout({ top, bottomList }: PageLayoutProps) {
  return (
    <StyledHomeWrapper>
      <StyledHomeTop>{top}</StyledHomeTop>
      {bottomList}
    </StyledHomeWrapper>
  );
}
