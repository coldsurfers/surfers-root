'use client'

import { memo } from 'react'
import { StyledTagItem, StyledTagItemText } from './tag-item.styled'

export const TagItem = memo(({ name, color }: { name: string; color: string }) => {
  return (
    <StyledTagItem color={color}>
      <StyledTagItemText>#{name}</StyledTagItemText>
    </StyledTagItem>
  )
})
