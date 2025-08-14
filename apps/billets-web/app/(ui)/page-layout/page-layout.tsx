'use client';

import { VenueWithMemoEventList } from 'app/(components)/venue-with-memo-event-list';

import { StyledHomeTop, StyledHomeWrapper } from './page-layout.styled';
import type { PageLayoutProps } from './page-layout.types';

export function PageLayout({ top, slugs }: PageLayoutProps) {
  return (
    <StyledHomeWrapper>
      <StyledHomeTop>{top}</StyledHomeTop>
      {slugs.map((slug) => (
        <VenueWithMemoEventList key={slug} slug={slug} />
      ))}
    </StyledHomeWrapper>
  );
}
