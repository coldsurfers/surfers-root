'use client'

import { semantics } from '@coldsurfers/ocean-road'
import Link from 'next/link'
import { StyledLinkItemContainer, StyledLinkItemText, StyledShareButton, StyledShareIcon } from './link-item.styled'
import { LinkItemProps } from './link-item.types'

export function LinkItem({ href, title, onClickShare }: LinkItemProps) {
  return (
    <StyledLinkItemContainer
      whileHover={{
        transform: 'translate(4px, 4px)',
        boxShadow: semantics.color.border[2] + ' 4px 4px 0px 0px',
        transition: {
          duration: 0.05,
          ease: 'easeInOut',
        },
      }}
      whileTap={{
        transform: 'translate(4px, 4px)',
        boxShadow: semantics.color.border[2] + ' 4px 4px 0px 0px',
        transition: {
          duration: 0.05,
          ease: 'easeInOut',
        },
      }}
    >
      <Link
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <StyledLinkItemText as="span">{title}</StyledLinkItemText>
      </Link>
      <StyledShareButton
        whileHover={{
          scale: 1.1, // Button scales up slightly on hover
          backgroundColor: semantics.color.background[2], // Changes background color
        }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => {
          e.stopPropagation()
          onClickShare?.()
        }}
      >
        <StyledShareIcon />
      </StyledShareButton>
    </StyledLinkItemContainer>
  )
}
