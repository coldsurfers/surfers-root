'use client';

import { initialPageQuery } from '@/libs/openapi-client';
import { useQuery } from '@tanstack/react-query';
import {
  VenueDetailMemoText,
  VenueDetailTopSubTitleText,
  VenueDetailTopTitleText,
  VenueDetailTopTopLine,
} from './venue-detail-top.styled';

export function VenueDetailTop({ venueSlug }: { venueSlug: string }) {
  const { data: venueDetail } = useQuery(initialPageQuery.venueDetailBySlug(venueSlug));
  return (
    <>
      <VenueDetailTopTopLine>
        <VenueDetailTopTitleText as="h1">{venueDetail?.name}</VenueDetailTopTitleText>
        <VenueDetailTopSubTitleText as="h2">주인을 찾습니다!</VenueDetailTopSubTitleText>
      </VenueDetailTopTopLine>
      {venueDetail?.memo && <VenueDetailMemoText as="q">{venueDetail?.memo}</VenueDetailMemoText>}
    </>
  );
}
