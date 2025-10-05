'use client';

import { initialPageQuery } from '@/libs/openapi-client';
import { useQuery } from '@tanstack/react-query';
import { VenueDetailMemoText, VenueDetailTopTitleText } from './venue-detail-top.styled';

export function VenueDetailTop({ venueSlug }: { venueSlug: string }) {
  const { data: venueDetail } = useQuery(initialPageQuery.venueDetailBySlug(venueSlug));
  return (
    <>
      <VenueDetailTopTitleText as="h1">{venueDetail?.name}</VenueDetailTopTitleText>
      {venueDetail?.memo && <VenueDetailMemoText as="q">{venueDetail?.memo}</VenueDetailMemoText>}
    </>
  );
}
