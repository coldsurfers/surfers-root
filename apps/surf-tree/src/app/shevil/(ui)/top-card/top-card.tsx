'use client'

import { StyledTopCard } from './top-card.styled'
import { TopCardProps } from './top-card.types'

export function TopCard(props: TopCardProps) {
  return <StyledTopCard $backgroundImageUrl={props.backgroundImageUrl}>{props.children}</StyledTopCard>
}
