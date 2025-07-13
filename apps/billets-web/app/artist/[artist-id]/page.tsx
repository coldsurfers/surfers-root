import {
  ArtistProfileDetailEventList,
  ArtistProfileDetailTop,
  ProfileDetailPageLayout,
} from '@/features/profile';
import { apiClient, initialPageQuery } from '@/libs/openapi-client';
import { ApiErrorBoundaryRegistry } from '@/libs/registries';
import { getQueryClient } from '@/libs/utils';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { RouteLoading } from 'app/(ui)';
import { redirect } from 'next/navigation';
import { cache } from 'react';

const getArtistDetail = cache((artistId: string) => apiClient.artist.getArtistDetail(artistId));

async function validateArtist(artistId: string) {
  try {
    const response = await getArtistDetail(artistId);
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

async function PageInner({ params }: { params: { 'artist-id': string } }) {
  const artistId = (await params)['artist-id'];
  const validation = await validateArtist(artistId);
  if (!validation.isValid) {
    return redirect('/404');
  }

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(initialPageQuery.artistDetail(artistId));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfileDetailPageLayout>
        <ArtistProfileDetailTop artistId={artistId} />
        <ArtistProfileDetailEventList artistId={artistId} />
      </ProfileDetailPageLayout>
    </HydrationBoundary>
  );
}

export default async function ArtistDetailPage(pageProps: {
  params: Promise<{ 'artist-id': string }>;
}) {
  return (
    <ApiErrorBoundaryRegistry>
      <RouteLoading>
        <PageInner params={await pageProps.params} />
      </RouteLoading>
    </ApiErrorBoundaryRegistry>
  );
}
