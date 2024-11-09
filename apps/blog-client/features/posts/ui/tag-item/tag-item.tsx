'use client'

import { memo } from 'react'
import { StyledTagItem } from './tag-item.styled'

export const TagItem = memo(({ name, color }: { name: string; color: string }) => {
  return <StyledTagItem color={color}>#{name}</StyledTagItem>
})
