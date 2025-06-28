'use client';

import { GlobalStyle } from '@coldsurfers/ocean-road';
import type { PropsWithChildren } from 'react';

export const OceanRoadThemeContext = ({ children }: PropsWithChildren) => {
  return (
    <>
      {children}
      <GlobalStyle />
    </>
  );
};
