'use client'

import { ColorSchemeProvider, GlobalStyle } from '@coldsurfers/ocean-road'
import { PropsWithChildren, useEffect, useState } from 'react'

export const OceanRoadThemeRegistry = ({ children }: PropsWithChildren) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <ColorSchemeProvider colorScheme="userPreference">
      {isMounted && children}
      <GlobalStyle />
    </ColorSchemeProvider>
  )
}
