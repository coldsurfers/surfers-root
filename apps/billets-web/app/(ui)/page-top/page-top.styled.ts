import { media } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Image from 'next/image'

export const StyledWrapper = styled.div`
  flex: 1;
`

export const StyledHomeMainTitle = styled.h1`
  font-size: 48px;
  font-weight: 900;
  white-space: pre-line; /* This allows newline support */

  ${media.large(css`
    font-size: 32px;
    white-space: normal;
  `)}
`

export const StyledHomeTopImage = styled(Image)`
  border-radius: 8px;
  ${media.large(css`
    width: 100%;
    height: 200px;
    object-fit: cover;
  `)}
`
