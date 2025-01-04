import { media, Text } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const StyledWrapper = styled.div`
  flex: 1;
`

export const StyledHomeMainTitle = styled(Text)`
  font-size: 48px;
  font-weight: 900;
  white-space: pre-line; /* This allows newline support */

  ${media.large(css`
    font-size: 42px;
    white-space: normal;
  `)}

  ${media.medium(css`
    font-size: 32px;
    white-space: normal;
  `)}
`

export const StyledHomeTopImage = styled.img`
  border-radius: 8px;
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  object-position: 50%;

  ${media.large(css`
    width: 100%;
    aspect-ratio: 2 / 1;
  `)}
`
