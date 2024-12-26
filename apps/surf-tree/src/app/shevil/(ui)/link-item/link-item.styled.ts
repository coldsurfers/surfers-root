import { media, semantics, Text } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { EllipsisVertical } from 'lucide-react'

export const StyledLinkItemContainer = styled.div`
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

  transform: translate(0px, 0px);

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
  text-align: center;
`

export const StyledShareButton = styled.button`
  background-color: initial;
  border: none;
  cursor: pointer;
  z-index: 1;
  right: 6px;
  position: absolute;
`

export const StyledShareIcon = styled(EllipsisVertical)`
  width: 24px;
  height: 24px;
  color: ${semantics.color.foreground[1]};
`
