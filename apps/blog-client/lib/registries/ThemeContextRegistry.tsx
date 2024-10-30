'use client'

import { PropsWithChildren, createContext, useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'

interface ThemeContextProps {
  theme: string
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextProps>(null!)

const ThemeContextRegistry = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null)

  const handleSystemThemeChange = (e: MediaQueryListEvent) => {
    const newSystemTheme = e.matches ? 'dark' : 'light'
    setTheme(newSystemTheme)
  }

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (prefersDark) {
      setTheme('dark')
    } else {
      setTheme('light')
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', handleSystemThemeChange)

    // Cleanup event listener on unmount
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  }, [])

  if (theme === null) {
    return null
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme: () => {} }}>
      <ThemeProvider theme={theme === 'light' ? {} : {}}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}

export default ThemeContextRegistry
