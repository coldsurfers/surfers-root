'use client';

import type { PropsWithChildren } from 'react';
import { StyledPageLayoutUI } from './page-layout-ui.styled';

export const PageLayoutUI = ({ children }: PropsWithChildren) => {
  return <StyledPageLayoutUI>{children}</StyledPageLayoutUI>;
};
