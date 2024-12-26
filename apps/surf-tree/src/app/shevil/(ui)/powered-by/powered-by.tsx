'use client'

import { Text } from '@coldsurfers/ocean-road'
import { StyledPoweredBy } from './powered-by.styled'

export const PoweredBy = () => {
  return (
    <StyledPoweredBy href="/">
      <Text as="p" style={{ margin: 'unset' }}>
        Powered by SurfTree
      </Text>
    </StyledPoweredBy>
  )
}
