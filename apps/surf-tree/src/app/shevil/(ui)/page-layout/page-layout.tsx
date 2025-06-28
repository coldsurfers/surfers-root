'use client';

import { Footer } from '../footer/footer';
import { PoweredBy } from '../powered-by';
import { StyledPageLayout } from './page-layout.styled';

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <StyledPageLayout>
      {children}
      <Footer>
        <PoweredBy />
      </Footer>
    </StyledPageLayout>
  );
}
