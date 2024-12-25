'use client'

import { EllipsisVertical } from 'lucide-react'
import Link from 'next/link'
import { StyledLinkItemContainer, StyledLinkItemText, StyledShareButton } from './link-item.styled'
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
        <EllipsisVertical width={16} height={16} />
      </StyledShareButton>
    </StyledLinkItemContainer>
  )
}
