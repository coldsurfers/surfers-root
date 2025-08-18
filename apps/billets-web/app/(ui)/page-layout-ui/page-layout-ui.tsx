'use client';

import { usePathname } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import { StyledPageLayoutUI } from './page-layout-ui.styled';

export const PageLayoutUI = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  return <StyledPageLayoutUI $isHome={pathname === '/'}>{children}</StyledPageLayoutUI>;
};
