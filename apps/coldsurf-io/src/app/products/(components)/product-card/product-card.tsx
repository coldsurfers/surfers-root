'use client'

import { useProductStore } from '@/stores'
import { useShallow } from 'zustand/shallow'
import { ProductCard as Card } from '../../(ui)'
import { ProductCardProps } from './product-card.types'

export function ProductCard({ title, description, imgSrc, backgroundImgSrc }: ProductCardProps) {
  const { setIsProductBottomSheetOpen } = useProductStore(
    useShallow((state) => ({
      isProductBottomSheetOpen: state.isProductBottomSheetOpen,
      setIsProductBottomSheetOpen: state.setIsProductBottomSheetOpen,
    })),
  )
  return (
    <Card
      onClick={() => setIsProductBottomSheetOpen(true)}
      title={title}
      description={description}
      imgSrc={imgSrc}
      backgroundImgSrc={backgroundImgSrc}
    />
  )
}
