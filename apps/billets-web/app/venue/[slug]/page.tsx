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

const getVenueDetailBySlug = cache((slug: string) => apiClient.venue.getVenueDetailBySlug(slug));

async function validateVenue(venueSlug: string) {
  try {
    const response = await getVenueDetailBySlug(venueSlug);
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

async function PageInner({ params }: { params: { slug: string } }) {
  const venueSlug = decodeURIComponent(params.slug);

  const validation = await validateVenue(venueSlug);

  if (!validation.isValid) {
    return redirect('/404');
  }

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(initialPageQuery.venueDetailBySlug(venueSlug));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <VenueDetailPageLayout>
        <VenueDetailTop venueSlug={venueSlug} />
        <VenueDetailEventList venueSlug={venueSlug} />
        <VenueDetailAbout venueSlug={venueSlug} />
      </VenueDetailPageLayout>
    </HydrationBoundary>
  );
}

export default async function VenueDetailPage(props: {
  params: Promise<{ slug: string }>;
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
