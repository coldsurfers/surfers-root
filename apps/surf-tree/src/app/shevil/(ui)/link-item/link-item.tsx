'use client';

import Link from 'next/link';
import { ShareButton } from '../share-button';
import { StyledLinkItemContainer, StyledLinkItemText } from './link-item.styled';
import type { LinkItemProps } from './link-item.types';

export function LinkItem({ href, title, onClickShare }: LinkItemProps) {
  return (
    <StyledLinkItemContainer
      whileHover={{
        transform: 'translate(4px, 4px)',
        transition: {
          duration: 0.05,
          ease: 'easeInOut',
        },
      }}
      whileTap={{
        transform: 'translate(4px, 4px)',
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
      <div
        style={{
          right: '6px',
          position: 'absolute',
          zIndex: 1,
        }}
      >
        <ShareButton onClickShare={onClickShare} />
      </div>
    </StyledLinkItemContainer>
  );
}
