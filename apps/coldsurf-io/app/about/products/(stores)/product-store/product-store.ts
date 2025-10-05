import { create } from 'zustand';
import type { Product } from '../../(models)';

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
