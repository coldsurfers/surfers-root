'use client'

import { useProductStore } from '@/stores'
import { useShallow } from 'zustand/shallow'
import {
  StyledProductCardContainer,
  StyledProductCardDescription,
  StyledProductCardTitle,
  StyledProductImage,
} from './product-card.styled'
import { ProductCardProps } from './product-card.types'

export function ProductCard({ title, description, imgSrc, backgroundImgSrc }: ProductCardProps) {
  const { setIsProductBottomSheetOpen } = useProductStore(
    useShallow((state) => ({
      isProductBottomSheetOpen: state.isProductBottomSheetOpen,
      setIsProductBottomSheetOpen: state.setIsProductBottomSheetOpen,
    })),
  )
  return (
    <StyledProductCardContainer
      onClick={() => setIsProductBottomSheetOpen(true)}
      $afterContent={`Explore ${title}`}
      $backgroundImgSrc={backgroundImgSrc}
    >
      <StyledProductImage src={imgSrc} alt="product" />
      <StyledProductCardTitle as="h1">{title}</StyledProductCardTitle>
      <StyledProductCardDescription as="p">{description}</StyledProductCardDescription>
    </StyledProductCardContainer>
  )
}
