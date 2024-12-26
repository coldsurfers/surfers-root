import { media } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const StyledFooter = styled.div`
  position: absolute;

  bottom: 4rem;
  width: 100%;
  max-width: 580px;

  ${media.small(css`
    margin: 0rem auto;
  `)}
`
