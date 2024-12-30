'use client'

import { Text } from '@coldsurfers/ocean-road'
import { StyledProductCardContainer } from './product-card.styled'

export function ProductCard() {
  return (
    <StyledProductCardContainer $afterContent="Explore Billets">
      <img
        src={
          'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/46/e8/cd/46e8cdc3-01d8-0ebd-1ba4-305eda6e0c31/AppIcon-0-0-1x_U007emarketing-0-6-0-85-220.png/230x0w.webp'
        }
        alt="product"
        style={{ objectFit: 'cover', width: 120, height: 120, borderRadius: '50%' }}
      />
      <Text as="h1">Billets</Text>
      <Text as="p">공연 정보를 더 신속하게, Billets</Text>
    </StyledProductCardContainer>
  )
}
