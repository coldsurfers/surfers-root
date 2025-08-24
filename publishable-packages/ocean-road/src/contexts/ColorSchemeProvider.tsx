import darkColorDesignTokens from '@coldsurfers/ocean-road-design-tokens/dist/json/color/variables-dark.json';
import lightColorDesignTokens from '@coldsurfers/ocean-road-design-tokens/dist/json/color/variables-light.json';
import {
  type Context,
  type PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { type DarkColorDesignTokens, type LightColorDesignTokens, colors } from '../tokens';

export type ColorScheme = 'light' | 'dark' | 'userPreference';

export interface Theme extends DarkColorDesignTokens, LightColorDesignTokens {
  name: 'lightMode' | 'darkMode';
}

export const lightModeTheme: Theme = {
  name: 'lightMode',
  ...lightColorDesignTokens,
};
export const darkModeTheme: Theme = {
  name: 'darkMode',
  ...darkColorDesignTokens,
};

export const generateCssVar = (themeName: Theme['name']) => {
  const theme = themeName === 'lightMode' ? lightModeTheme : darkModeTheme;
  let styles = '';
  Object.keys(theme).forEach((key) => {
    styles += `  --${key}: ${theme[key as keyof Theme]};\n`;
  });
  return styles;
};

const cssVar = (name: string) => `var(--${name})`;

const darkColorKeys = Object.keys(darkColorDesignTokens);

export const themeVariables = darkColorKeys.reduce(
  (prev, curr) => {
    const next = prev;
    next[curr as keyof DarkColorDesignTokens] = cssVar(curr);
    return next;
  },
  {} as Record<keyof DarkColorDesignTokens, string>
);

export const themeToStyles = (theme: Theme) => {
  let styles = '';
  Object.keys(colors).forEach((key) => {
    styles += `  --${key}: ${colors[key as keyof typeof colors]};\n`;
  });
  if (theme.name === 'darkMode') {
    Object.keys(darkColorDesignTokens).forEach((key) => {
      styles += `  --${key}: ${darkColorDesignTokens[key as keyof typeof darkColorDesignTokens]};\n`;
    });
  }
  if (theme.name === 'lightMode') {
    Object.keys(lightColorDesignTokens).forEach((key) => {
      styles += `  --${key}: ${lightColorDesignTokens[key as keyof typeof lightColorDesignTokens]};\n`;
    });
  }

  return styles;
};

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: ColorScheme) => void;
};

const ThemeContext: Context<ThemeContextValue> = createContext<ThemeContextValue>({
  theme: lightModeTheme,
  setTheme: () => {},
});

const getTheme = (colorScheme?: ColorScheme) =>
  colorScheme === 'dark' ||
  (colorScheme === 'userPreference' &&
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches)
    ? darkModeTheme
    : lightModeTheme;

const ColorSchemeProvider = ({
  children,
  colorScheme,
  id,
}: PropsWithChildren<{ colorScheme: ColorScheme; id?: string }>) => {
  const [theme, setTheme] = useState(getTheme(colorScheme));
  const className = id ? `__oceanRoadTheme${id}` : undefined;
  const selector = className ? `.${className}` : ':root';

  const handlePrefChange = useCallback((e: MediaQueryListEvent) => {
    setTheme(getTheme(e.matches ? 'dark' : 'light'));
  }, []);

  useEffect(() => {
    setTheme(getTheme(colorScheme));
    if (colorScheme === 'userPreference' && window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addListener(handlePrefChange);
      return () =>
        window.matchMedia('(prefers-color-scheme: dark)').removeListener(handlePrefChange);
    }
    return undefined;
  }, [colorScheme, handlePrefChange]);

  return (
    <ThemeContext.Provider
      value={{
        theme: theme,
        setTheme: (theme: ColorScheme) => {
          setTheme(getTheme(theme));
        },
      }}
    >
      <style
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{
          __html:
            colorScheme === 'userPreference'
              ? `${selector} {
${themeToStyles(lightModeTheme)}
}\n@media(prefers-color-scheme: dark) {
  ${selector} {
${themeToStyles(darkModeTheme)}
  }
}`
              : `${selector} {
${themeToStyles(theme)} }`,
        }}
      />
      <div className={className}>{children}</div>
    </ThemeContext.Provider>
  );
};

export default ColorSchemeProvider;

export const useColorScheme = () => {
  const theme = useContext(ThemeContext);
  return theme || lightModeTheme;
};
