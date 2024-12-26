'use client'

import { media } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const StyledPageLayoutContainer = styled.main`
  padding: 0 20px;
  max-width: 1728px;
  margin: 0 auto;

  ${media.large(css`
    max-width: 1536px;
  `)}

  ${media.medium(css`
    width: 100%;
  `)}
`
