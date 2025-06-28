'use client';

import { StyledLinkItemsLayout } from './link-items-layout.styled';
import type { LinkItemsLayoutProps } from './link-items-layout.types';

export const LinkItemsLayout = ({ children }: LinkItemsLayoutProps) => {
  return <StyledLinkItemsLayout>{children}</StyledLinkItemsLayout>;
};
