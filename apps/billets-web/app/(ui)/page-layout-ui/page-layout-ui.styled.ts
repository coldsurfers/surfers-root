import { media } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const StyledPageLayoutUI = styled.div`
  padding: 0 40px;
  ${media.large(css`
    padding: 0 16px;
  `)}
`
