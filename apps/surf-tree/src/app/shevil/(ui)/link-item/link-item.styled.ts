import { media, semantics, Text } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Link from 'next/link'

export const StyledLinkItem = styled(Link)`
  padding-left: 44px;
  padding-right: 44px;
  min-height: 64px !important;
  background-color: ${semantics.color.background[4]};

  border-radius: 30px;
  border: 2px solid ${semantics.color.border[2]};
  box-shadow: ${semantics.color.border[2]} 8px 8px 0px 0px;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translate(4px, 4px);
    box-shadow: ${semantics.color.border[2]} 4px 4px 0px 0px;
  }
  &:active {
    transform: translate(4px, 4px);
    box-shadow: ${semantics.color.border[2]} 4px 4px 0px 0px;
  }

  ${media.small(css`
    margin-left: 24px;
    margin-right: 24px;
  `)}
`

export const StyledLinkItemText = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: ${semantics.color.foreground[1]};
`
