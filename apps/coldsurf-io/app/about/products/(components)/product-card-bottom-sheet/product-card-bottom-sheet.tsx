'use client';

import { useShallow } from 'zustand/shallow';
import { useProductStore } from '../../(stores)/product-store';
import { ProductCardBottomSheet as BottomSheet } from '../../(ui)/product-card-bottom-sheet';

export function ProductCardBottomSheet() {
  const {
    isProductBottomSheetOpen: isOpen,
    setIsProductBottomSheetOpen: setIsOpen,
    selectedProduct,
  } = useProductStore(
    useShallow((state) => ({
      isProductBottomSheetOpen: state.isProductBottomSheetOpen,
      setIsProductBottomSheetOpen: state.setIsProductBottomSheetOpen,
      selectedProduct: state.selectedProduct,
    }))
  );
  if (!selectedProduct) {
    return null;
  }
  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      selectedProduct={selectedProduct}
    />
  );
}
