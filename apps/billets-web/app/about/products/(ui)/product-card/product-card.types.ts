import type { Product } from '../../(models)';

export type ProductCardProps = Product & {
  onClick: () => void;
};
