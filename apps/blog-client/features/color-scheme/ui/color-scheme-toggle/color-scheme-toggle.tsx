'use client'

import { Button, type ColorScheme, useColorScheme } from '@coldsurfers/ocean-road'
import { useCallback } from 'react'

export const ColorSchemeToggle = () => {
  const { theme, setTheme } = useColorScheme()

  const toggleColorScheme = useCallback(() => {
    const fetchColorScheme = async () => {
      const nextTheme: ColorScheme = theme.name === 'darkMode' ? 'light' : 'dark'
      const res = await fetch('/api/color-scheme', {
        method: 'POST',
        body: JSON.stringify({
          colorScheme: nextTheme,
        }),
      })
      const data = (await res.json()) as {
        success: true
        colorScheme: ColorScheme
      }
      if (nextTheme === data.colorScheme) {
        setTheme(data.colorScheme)
      }
    }
    fetchColorScheme()
  }, [setTheme, theme.name])

  return (
    <Button onClick={toggleColorScheme} theme="transparent" style={{ marginLeft: 'auto', fontSize: 20 }}>
      {theme.name === 'darkMode' ? '☀️' : '🌕'}
    </Button>
  )
}
