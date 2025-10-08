'use client';

import { type ColorScheme, ColorSchemeProvider, GlobalStyle } from '@coldsurfers/ocean-road';
import type { PropsWithChildren } from 'react';

export const OceanRoadThemeRegistry = ({
  children,
  defaultColorScheme,
}: PropsWithChildren<{ defaultColorScheme?: ColorScheme }>) => {
  return (
    <ColorSchemeProvider colorScheme={defaultColorScheme || 'light'}>
      {children}
      <GlobalStyle />
    </ColorSchemeProvider>
  );
};
