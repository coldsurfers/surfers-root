'use client'

import { Text } from '@coldsurfers/ocean-road'
import { StyledProductCardContainer } from './product-card.styled'

export function ProductCard({
  title,
  description,
  imgSrc,
  backgroundImgSrc,
}: {
  title: string
  description: string
  imgSrc: string
  backgroundImgSrc: string
}) {
  return (
    <StyledProductCardContainer $afterContent={`Explore ${title}`} $backgroundImgSrc={backgroundImgSrc}>
      <img src={imgSrc} alt="product" style={{ objectFit: 'cover', width: 120, height: 120, borderRadius: '50%' }} />
      <Text as="h1">{title}</Text>
      <Text as="p">{description}</Text>
    </StyledProductCardContainer>
  )
}
