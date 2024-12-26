'use client'

import Link from 'next/link'
import { StyledLinkItemContainer, StyledLinkItemText, StyledShareButton, StyledShareIcon } from './link-item.styled'
import { LinkItemProps } from './link-item.types'

export function LinkItem({ href, title }: LinkItemProps) {
  return (
    <StyledLinkItemContainer>
      <Link
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <StyledLinkItemText as="span">{title}</StyledLinkItemText>
      </Link>
      <StyledShareButton onClick={(e) => e.stopPropagation()}>
        <StyledShareIcon />
      </StyledShareButton>
    </StyledLinkItemContainer>
  )
}
