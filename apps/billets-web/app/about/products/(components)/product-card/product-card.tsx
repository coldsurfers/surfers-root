'use client';

import { useShallow } from 'zustand/shallow';
import { useProductStore } from '../../(stores)/product-store';
import { ProductCard as Card } from '../../(ui)';
import type { ProductCardProps } from './product-card.types';

export function ProductCard(props: ProductCardProps) {
  const { setSelectedProduct, setIsProductBottomSheetOpen } = useProductStore(
    useShallow((state) => ({
      setSelectedProduct: state.setSelectedProduct,
      setIsProductBottomSheetOpen: state.setIsProductBottomSheetOpen,
    }))
  );
  return (
    <Card
      onClick={() => {
        setIsProductBottomSheetOpen(true);
        setSelectedProduct(props);
      }}
      {...props}
    />
  );
}
