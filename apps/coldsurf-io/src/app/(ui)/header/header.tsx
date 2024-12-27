'use client'

import { Text } from '@coldsurfers/ocean-road'
import { StyledHeader, StyledHeaderWrapper } from './header.styled'

export function Header() {
  return (
    <StyledHeaderWrapper>
      <StyledHeader>
        <div style={{ paddingLeft: '32px' }}>
          <Text as="h2">COLDSURF</Text>
        </div>
      </StyledHeader>
    </StyledHeaderWrapper>
  )
}
