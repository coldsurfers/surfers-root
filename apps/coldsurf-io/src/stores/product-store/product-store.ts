import type { Product } from '@/types';
import { create } from 'zustand';

export type ProductStore = {
  isProductBottomSheetOpen: boolean;
  setIsProductBottomSheetOpen: (value: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
};

export const useProductStore = create<ProductStore>((set) => ({
  isProductBottomSheetOpen: false,
  setIsProductBottomSheetOpen: (value: boolean) => set({ isProductBottomSheetOpen: value }),
  selectedProduct: null,
  setSelectedProduct: (product: Product | null) => set({ selectedProduct: product }),
}));
