import type { Product } from '@/types';

export type ProductCardBottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct: Product;
};
