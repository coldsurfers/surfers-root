import { media } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const StyledLinkItemsLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding-bottom: 3.5rem;

  ${media.small(css`
    padding-bottom: 2.5rem;
  `)}
`
