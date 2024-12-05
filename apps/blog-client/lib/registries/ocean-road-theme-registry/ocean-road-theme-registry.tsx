'use client'

import { ColorSchemeProvider, GlobalStyle } from '@coldsurfers/ocean-road'
import { PropsWithChildren } from 'react'

export const OceanRoadThemeRegistry = ({
  children,
  colorScheme,
}: PropsWithChildren<{
  colorScheme: 'light' | 'dark'
}>) => {
  return (
    <ColorSchemeProvider colorScheme={colorScheme}>
      {children}
      <GlobalStyle />
    </ColorSchemeProvider>
  )
}
