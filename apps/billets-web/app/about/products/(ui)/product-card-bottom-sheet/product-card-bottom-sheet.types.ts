import type { Product } from '../../(models)';

export type ProductCardBottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct: Product;
};
