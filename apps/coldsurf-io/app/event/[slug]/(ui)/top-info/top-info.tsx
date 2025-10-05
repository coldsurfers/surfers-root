'use client';

import { GlobalLink, VenueTitleMotion } from '@/shared/ui';
import {
  StyledFormattedDate,
  StyledKOPISLabel,
  StyledTopInfoContainer,
  StyledTopInfoTitle,
  StyledVenueTitle,
} from './top-info.styled';

export function TopInfo({
  title,
  venueTitle,
  formattedDate,
  venueSlug,
  isKOPIS,
}: {
  title: string;
  venueTitle: string;
  formattedDate: string;
  venueSlug: string;
  isKOPIS: boolean;
}) {
  return (
    <StyledTopInfoContainer>
      <StyledTopInfoTitle as="h1">{title}</StyledTopInfoTitle>
      <GlobalLink href={`/venue/${venueSlug}`}>
        <VenueTitleMotion text={<StyledVenueTitle as="span">{venueTitle}</StyledVenueTitle>} />
      </GlobalLink>
      <StyledFormattedDate as="h3">{formattedDate}</StyledFormattedDate>
      {isKOPIS && (
        <StyledKOPISLabel as="h3">
          출처: (재)예술경영지원센터 공연예술통합전산망(www.kopis.or.kr)
        </StyledKOPISLabel>
      )}
    </StyledTopInfoContainer>
  );
}
