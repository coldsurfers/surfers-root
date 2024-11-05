import variables from '@coldsurfers/design-tokens/dist/js/color/semantic/variables'
import color from '@coldsurfers/design-tokens/dist/js/color/variables'
import { Global, css } from '@emotion/react'

export default function GlobalStyle() {
  return (
    <Global
      styles={css`
        html,
        body {
          padding: 0;
          margin: 0;
        }

        body {
          background-color: white;
          color: ${variables.color.foreground[1]};
          white-space: pre-wrap;
        }

        @media (prefers-color-scheme: dark) {
          body {
            background-color: rgb(24, 24, 31);
          }
        }

        a {
          color: ${color.oc.blue[5].value};
          text-decoration: none;
        }

        p {
          margin: unset;
        }

        * {
          box-sizing: border-box;
        }

        h1 {
          font-weight: 800;
        }
      `}
    />
  )
}
