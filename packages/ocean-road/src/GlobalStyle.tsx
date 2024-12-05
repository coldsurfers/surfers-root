import { Global, css } from '@emotion/react'
import { colors, semantics } from './tokens'

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
          background-color: ${semantics.color.background[2]};
          color: ${semantics.color.foreground[1]};
          white-space: pre-wrap;
        }

        /* @media (prefers-color-scheme: dark) {
          body {
            background-color: rgb(24, 24, 31);
          }
        } */

        a {
          color: ${colors.oc.blue[5].value};
          text-decoration: none;
        }

        * {
          box-sizing: border-box;
        }
      `}
    />
  )
}
