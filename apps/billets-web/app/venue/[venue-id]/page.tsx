import { apiClient, initialPageQuery } from '@/libs/openapi-client';
import { ApiErrorBoundaryRegistry } from '@/libs/registries';
import { getQueryClient } from '@/libs/utils/utils.query-client';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { RouteLoading } from 'app/(ui)';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import {
  VenueDetailAbout,
  VenueDetailEventList,
  VenueDetailPageLayout,
  VenueDetailTop,
} from './(ui)';

const getVenueDetail = cache((venueId: string) => apiClient.venue.getVenueDetail(venueId));

async function validateVenue(venueId: string) {
  try {
    const response = await getVenueDetail(venueId);
    return {
      isValid: true,
      data: response,
    };
  } catch (e) {
    console.error(e);
    return {
      isValid: false,
      data: null,
    } as const;
  }
}

async function PageInner({ params }: { params: { 'venue-id': string } }) {
  const venueId = params['venue-id'];

  const validation = await validateVenue(venueId);

  if (!validation.isValid) {
    return redirect('/404');
  }

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(initialPageQuery.venueDetail(venueId));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <VenueDetailPageLayout>
        <VenueDetailTop venueId={venueId} />
        <VenueDetailEventList venueId={venueId} />
        <VenueDetailAbout venueId={venueId} />
      </VenueDetailPageLayout>
    </HydrationBoundary>
  );
}

export default async function VenueDetailPage(props: {
  params: Promise<{ 'venue-id': string }>;
}) {
  const params = await props.params;
  return (
    <ApiErrorBoundaryRegistry>
      <RouteLoading>
        <PageInner params={await params} />
      </RouteLoading>
    </ApiErrorBoundaryRegistry>
  );
}
