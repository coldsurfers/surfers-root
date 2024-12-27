'use client'

import { media, Text } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const StyledPageLayoutContainer = styled.main`
  padding: 0 20px;
  max-width: 1728px;
  margin: 2rem auto;

  ${media.large(css`
    max-width: 1536px;
  `)}

  ${media.medium(css`
    width: 100%;
  `)}
`

export const BigTitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10rem;

  ${media.medium(css`
    margin-top: 2rem;
  `)}
`

export const BigTitle = styled(Text)`
  font-size: 88px;
  font-weight: 820;
  line-height: 1.05;
  text-align: center;

  ${media.large(css`
    font-size: 64px;
  `)}

  ${media.medium(css`
    font-size: 48px;
  `)}

  ${media.small(css`
    font-size: 36px;
  `)}
`
