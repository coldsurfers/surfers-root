'use client';

import { StyledTopCard } from './top-card.styled';
import type { TopCardProps } from './top-card.types';

export function TopCard(props: TopCardProps) {
  return (
    <StyledTopCard
      src={props.backgroundImageUrl}
      width={580}
      height={580}
      alt={props.backgroundImageUrl}
      objectFit="cover"
      objectPosition="50%"
    >
      {props.children}
    </StyledTopCard>
  );
}
