'use client';

import {
  StyledProductCardContainer,
  StyledProductCardDescription,
  StyledProductCardTitle,
  StyledProductImage,
} from './product-card.styled';
import type { ProductCardProps } from './product-card.types';

export function ProductCard({
  title,
  description,
  imgSrc,
  backgroundImgSrc,
  onClick,
}: ProductCardProps) {
  return (
    <StyledProductCardContainer
      onClick={onClick}
      $afterContent={`Explore ${title}`}
      $backgroundImgSrc={backgroundImgSrc}
    >
      <StyledProductImage src={imgSrc} alt="product" />
      <StyledProductCardTitle as="h1">{title}</StyledProductCardTitle>
      <StyledProductCardDescription as="p">{description}</StyledProductCardDescription>
    </StyledProductCardContainer>
  );
}
