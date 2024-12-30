'use client'

import {
  StyledProductCardContainer,
  StyledProductCardDescription,
  StyledProductCardTitle,
  StyledProductImage,
} from './product-card.styled'

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
      <StyledProductImage src={imgSrc} alt="product" />
      <StyledProductCardTitle as="h1">{title}</StyledProductCardTitle>
      <StyledProductCardDescription as="p">{description}</StyledProductCardDescription>
    </StyledProductCardContainer>
  )
}
