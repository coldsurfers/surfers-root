'use client'

import { useProductStore } from '@/stores'
import { useShallow } from 'zustand/shallow'
import { ProductCardBottomSheet as BottomSheet } from '../../(ui)/product-card-bottom-sheet'

export function ProductCardBottomSheet() {
  const { isProductBottomSheetOpen: isOpen, setIsProductBottomSheetOpen: setIsOpen } = useProductStore(
    useShallow((state) => ({
      isProductBottomSheetOpen: state.isProductBottomSheetOpen,
      setIsProductBottomSheetOpen: state.setIsProductBottomSheetOpen,
    })),
  )
  return <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)} />
}
