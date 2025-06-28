'use client';

import type { PropsWithChildren } from 'react';
import { StyledPageLayout } from './artist-detail-page-layout.styled';

export function ArtistDetailPageLayout({ children }: PropsWithChildren) {
  return <StyledPageLayout>{children}</StyledPageLayout>;
}
