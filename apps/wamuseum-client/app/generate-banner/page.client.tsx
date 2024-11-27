'use client'

import { BannerGenerator } from '@/features'
import { StyledPageWrapper } from './page.styled'

export const GenerateBannerPageClient = () => {
  return (
    <StyledPageWrapper>
      <BannerGenerator
        artist="Jamie XX"
        city="Seoul"
        formattedDate="28. 11. 24"
        title="In Waves Tour"
        venue="YES24 LIVEHALL"
      />
    </StyledPageWrapper>
  )
}
