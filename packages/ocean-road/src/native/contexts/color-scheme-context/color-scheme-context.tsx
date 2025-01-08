import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react'
import { ColorScheme } from '../../../contexts/ColorSchemeProvider'
import { semanticVariables } from '../../../tokens/tokens'

export const ColorSchemeContext = createContext<{
  colorScheme: ColorScheme
  semantics: (typeof semanticVariables)['light']['color'] | (typeof semanticVariables)['dark']['color']
  setColorScheme: (colorScheme: ColorScheme) => void
}>({
  colorScheme: 'light',
  semantics: semanticVariables.light.color,
  setColorScheme: (colorScheme) => {
    console.log(colorScheme)
  },
})

export const ColorSchemeProvider = ({ children }: PropsWithChildren) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light')
  const semantics = useMemo(() => {
    switch (colorScheme) {
      case 'light':
        return semanticVariables.light.color
      case 'dark':
        return semanticVariables.dark.color
      case 'userPreference':
        return semanticVariables.light.color
    }
  }, [colorScheme])
  return (
    <ColorSchemeContext.Provider value={{ colorScheme, setColorScheme, semantics }}>
      {children}
    </ColorSchemeContext.Provider>
  )
}

export const useColorScheme = () => {
  return useContext(ColorSchemeContext)
}
