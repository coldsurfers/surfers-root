'use client';

import { BannerGenerator } from '@/features';
import { StyledPageWrapper } from './page.styled';

export const GenerateBannerPageClient = () => {
  return (
    <StyledPageWrapper>
      <BannerGenerator />
    </StyledPageWrapper>
  );
};
