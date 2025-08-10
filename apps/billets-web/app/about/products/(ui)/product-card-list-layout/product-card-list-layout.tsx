'use client';

import type { PropsWithChildren } from 'react';
import {
  ProductCardListLayoutContainer,
  ProductCardListLayoutWrapper,
} from './product-card-list-layout.styled';

export function ProductCardListLayout({ children }: PropsWithChildren) {
  return (
    <ProductCardListLayoutWrapper>
      <ProductCardListLayoutContainer>{children}</ProductCardListLayoutContainer>
    </ProductCardListLayoutWrapper>
  );
}
