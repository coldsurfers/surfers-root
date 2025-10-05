'use client';

import { initialPageQuery } from '@/libs/openapi-client';
import { useQuery } from '@tanstack/react-query';
import { StyledTitleText } from './venue-detail-about.styled';

export function VenueDetailAbout({ venueSlug }: { venueSlug: string }) {
  const { data: venueDetail } = useQuery(initialPageQuery.venueDetailBySlug(venueSlug));

  return (
    <>
      <StyledTitleText as="h2">About</StyledTitleText>
      <StyledTitleText>{venueDetail?.address}</StyledTitleText>
    </>
  );
}
