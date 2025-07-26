'use client';

import type { PropsWithChildren } from 'react';
import { StyledPageLayout } from './venue-detail-page-layout.styled';

export function VenueDetailPageLayout({ children }: PropsWithChildren) {
  return <StyledPageLayout>{children}</StyledPageLayout>;
}
