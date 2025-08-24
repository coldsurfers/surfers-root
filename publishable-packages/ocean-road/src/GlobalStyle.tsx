import { Global, css } from '@emotion/react';
import { darkModeTheme, lightModeTheme, themeToStyles } from './contexts/ColorSchemeProvider';
import { colors, semantics } from './tokens';

export default function GlobalStyle() {
  return (
    <Global
      styles={css`
        html,
        body {
          padding: 0;
          margin: 0;
        }

        html {
          ${themeToStyles(lightModeTheme)}
        }
        html.dark {
          ${themeToStyles(darkModeTheme)}
        }

        body {
          background-color: ${semantics.color.background[2]};
          color: ${semantics.color.foreground[1]};
          white-space: pre-wrap;
        }

        a {
          color: ${colors.oc.blue[5].value};
          text-decoration: none;
        }

        * {
          box-sizing: border-box;
        }
      `}
    />
  );
}
