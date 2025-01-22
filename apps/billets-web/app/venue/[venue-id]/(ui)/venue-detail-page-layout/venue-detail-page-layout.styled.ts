import { media } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const StyledPageLayout = styled.div`
  padding-top: 172px;
  padding-bottom: 80px;

  ${media.large(css`
    padding-right: 24px;
    padding-left: 24px;
  `)}

  ${media.medium(css`
    padding-top: 78px;
    padding-right: 16px;
    padding-bottom: 12px;
    padding-left: 16px;
  `)}
`
