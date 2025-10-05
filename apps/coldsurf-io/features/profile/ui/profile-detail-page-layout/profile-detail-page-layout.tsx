'use client';

import type { PropsWithChildren } from 'react';
import { StyledPageLayout } from './profile-detail-page-layout.styled';

export function ProfileDetailPageLayout({ children }: PropsWithChildren) {
  return <StyledPageLayout>{children}</StyledPageLayout>;
}
