'use client';

import { GlobalLink } from '@/shared/ui';
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
  venueId,
  isKOPIS,
}: {
  title: string;
  venueTitle: string;
  formattedDate: string;
  venueId: string;
  isKOPIS: boolean;
}) {
  return (
    <StyledTopInfoContainer>
      <StyledTopInfoTitle as="h1">{title}</StyledTopInfoTitle>
      <GlobalLink href={`/venue/${venueId}`}>
        <StyledVenueTitle as="h3">{venueTitle}</StyledVenueTitle>
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
