'use client';

import { GlobalLink } from '@/shared/ui';
import { colors, semantics } from '@coldsurfers/ocean-road';
import { motion } from 'framer-motion';
import {
  StyledFormattedDate,
  StyledKOPISLabel,
  StyledTopInfoContainer,
  StyledTopInfoTitle,
  StyledVenueTitle,
} from './top-info.styled';

// @ts-ignore
const VenueTitleMotion = motion.create(StyledVenueTitle);

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
        <VenueTitleMotion
          whileHover={{
            transition: { duration: 0.2, ease: 'easeInOut' },
            color: colors.oc.cyan[8].value,
          }}
          initial={{
            color: semantics.color.foreground[1],
          }}
        >
          {venueTitle}
        </VenueTitleMotion>
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
