'use client'

import { StyledLinkItem, StyledLinkItemText } from './link-item.styled'
import { LinkItemProps } from './link-item.types'

export function LinkItem({ href, title }: LinkItemProps) {
  return (
    <StyledLinkItem href={href} target="_blank" rel="noopener noreferrer">
      <StyledLinkItemText as="span">{title}</StyledLinkItemText>
    </StyledLinkItem>
  )
}
