'use client'

import { StyledPageLayout } from './page-layout.styled'

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <StyledPageLayout>
      <>{children}</>
    </StyledPageLayout>
  )
}
