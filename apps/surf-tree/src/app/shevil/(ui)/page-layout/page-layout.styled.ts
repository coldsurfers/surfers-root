import { media } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const StyledPageLayout = styled.div`
  margin: 2rem auto;
  height: 100%;
  width: 100%;
  max-width: 580px;

  ${media.small(css`
    margin: 0rem auto;
  `)}
`
