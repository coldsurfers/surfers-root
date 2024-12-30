import { ProductCardListLayout, TopTitle } from './(ui)'
import { ProductCard } from './(ui)/product-card'

export default function ProductsPage() {
  return (
    <>
      <TopTitle />
      <ProductCardListLayout>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </ProductCardListLayout>
    </>
  )
}
