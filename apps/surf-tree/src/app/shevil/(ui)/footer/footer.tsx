'use client';

import { StyledFooter } from './footer.styled';
import type { FooterProps } from './footer.types';

export function Footer({ children }: FooterProps) {
  return <StyledFooter>{children}</StyledFooter>;
}
