import { Metadata } from 'next'
import { ProductCard, ProductCardBottomSheet } from './(components)'
import { ProductCardListLayout, TopTitle } from './(ui)'

export const metadata: Metadata = {
  title: 'Products - COLDSURF',
  description: 'Explore our products to grow your artistic life even more easily!',
}

export default function ProductsPage() {
  return (
    <>
      <TopTitle />
      <ProductCardListLayout>
        <ProductCard
          title="Billets"
          description="공연 정보를 더 신속하게, Billets"
          imgSrc="https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/46/e8/cd/46e8cdc3-01d8-0ebd-1ba4-305eda6e0c31/AppIcon-0-0-1x_U007emarketing-0-6-0-85-220.png/230x0w.webp"
          backgroundImgSrc="https://images.unsplash.com/photo-1513265472937-50d3e680377c?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <ProductCard
          title="SurfTree"
          description="All in one artist links. SurfTree"
          imgSrc="https://surf-tree.coldsurf.io/icons/favicon.ico"
          backgroundImgSrc="https://images.unsplash.com/photo-1520262494112-9fe481d36ec3?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <ProductCard
          title="DemoDay"
          description="Share your demo by simple links. DemoDay"
          imgSrc="https://surf-tree.coldsurf.io/icons/favicon.ico"
          backgroundImgSrc="https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <ProductCard
          title="Play Together"
          description="Find your playmates with Play Together"
          imgSrc="https://surf-tree.coldsurf.io/icons/favicon.ico"
          backgroundImgSrc="https://images.unsplash.com/photo-1489641493513-ba4ee84ccea9?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </ProductCardListLayout>
      <ProductCardBottomSheet />
    </>
  )
}
