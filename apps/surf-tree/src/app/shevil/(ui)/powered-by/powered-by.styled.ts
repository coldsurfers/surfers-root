import { media, semantics } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Link from 'next/link'

export const StyledPoweredBy = styled(Link)`
  border-radius: 4rem;
  background: ${semantics.color.background[5]};

  padding: 0.75rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 15rem;
  margin: 0 auto;

  ${media.small(css`
    margin-left: 48px;
    margin-right: 48px;
    width: auto;
  `)};
`
