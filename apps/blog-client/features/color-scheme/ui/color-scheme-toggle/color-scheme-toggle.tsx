'use client'

import { Button, Text, type ColorScheme } from '@coldsurfers/ocean-road'
import styled from '@emotion/styled'
import { useCallback } from 'react'

const DarkLabelText = styled(Text)`
  display: block;
  html.dark & {
    display: none;
  }
`

const DarkLabel = () => {
  return <DarkLabelText>☀️</DarkLabelText>
}

const LightLabelText = styled(Text)`
  display: none;
  html.dark & {
    display: block;
  }
`

const LightLabel = () => {
  return <LightLabelText>🌕</LightLabelText>
}

export const ColorSchemeToggle = () => {
  const toggleColorScheme = useCallback(() => {
    const nextTheme: ColorScheme = window.__theme === 'dark' ? 'light' : 'dark'
    window.__setPreferredTheme(nextTheme)
  }, [])

  return (
    <Button onClick={toggleColorScheme} theme="transparent" style={{ marginLeft: 'auto', fontSize: 20 }}>
      <DarkLabel />
      <LightLabel />
    </Button>
  )
}
