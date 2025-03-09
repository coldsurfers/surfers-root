import { media } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const StyledPageLayout = styled.div`
  padding-top: 72px;
  padding-bottom: 80px;

  ${media.medium(css`
    padding-top: 78px;
    padding-bottom: 12px;
  `)}
`
