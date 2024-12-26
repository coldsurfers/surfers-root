import { media } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const StyledFooter = styled.div`
  position: relative;

  width: 100%;
  max-width: 580px;

  ${media.small(css`
    margin: 0rem auto;
    margin-bottom: 1rem;
  `)}
`
