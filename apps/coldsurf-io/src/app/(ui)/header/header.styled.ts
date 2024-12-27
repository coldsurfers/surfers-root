import { media, semantics } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const StyledHeaderWrapper = styled.div`
  padding-left: 96px;
  padding-right: 96px;
  padding-top: 48px;
  width: 100%;
  display: flex;
  justify-content: center;

  ${media['xx-large'](css`
    padding-left: 48px;
    padding-right: 48px;
    padding-top: 48px;
  `)}

  ${media['x-large'](css`
    padding-left: 24px;
    padding-right: 24px;
    padding-top: 16px;
  `)}
`

export const StyledHeader = styled.header`
  max-width: 1728px;
  width: 100%;
  background-color: ${semantics.color.background[3]};
  border-radius: 10000px;

  padding: 12px;

  ${media.large(css`
    max-width: 1536px;
  `)}

  ${media.medium(css`
    max-width: none;
    width: 100%;
  `)}
`
