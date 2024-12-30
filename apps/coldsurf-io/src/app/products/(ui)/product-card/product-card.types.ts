import { Product } from '@/types'

export type ProductCardProps = Product & {
  onClick: () => void
}
