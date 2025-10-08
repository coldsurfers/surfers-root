'use client';

import storage from '@/libs/utils/utils.storage';
import { type ColorScheme, ColorSchemeProvider, GlobalStyle } from '@coldsurfers/ocean-road';
import { type PropsWithChildren, useMemo } from 'react';

function getUserPreferenceColorScheme(e: MediaQueryList) {
  if (e.matches) {
    return 'dark';
  }
  return 'light';
}

export const OceanRoadThemeRegistry = ({
  children,
  cookieColorScheme,
}: PropsWithChildren<{ cookieColorScheme?: ColorScheme }>) => {
  const defaultColorScheme = useMemo<ColorScheme>(() => {
    // ssr
    if (typeof window === 'undefined') {
      return cookieColorScheme ?? 'light';
    }

    // csr
    const storageColorScheme = storage?.get<ColorScheme>('@coldsurf-io/theme');
    if (storageColorScheme) {
      return storageColorScheme;
    }
    const darkModeMedia = window.matchMedia('(prefers-color-scheme: dark)');

    return getUserPreferenceColorScheme(darkModeMedia);
  }, [cookieColorScheme]);

  return (
    <ColorSchemeProvider colorScheme={defaultColorScheme}>
      {children}
      <GlobalStyle />
    </ColorSchemeProvider>
  );
};
