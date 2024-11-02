'use client'

import { ColorSchemeProvider, GlobalStyle } from '@coldsurfers/ocean-road'
import { PropsWithChildren } from 'react'

export const OceanRoadThemeRegistry = ({ children }: PropsWithChildren) => {
  return (
    <ColorSchemeProvider colorScheme="userPreference">
      {children}
      <GlobalStyle />
    </ColorSchemeProvider>
  )
}
