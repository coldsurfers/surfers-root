'use client'

import { PropsWithChildren } from 'react'
import { StyledPageLayout } from './artist-detail-page-layout.styled'

export function ArtistDetailPageLayout({ children }: PropsWithChildren) {
  return <StyledPageLayout>{children}</StyledPageLayout>
}
