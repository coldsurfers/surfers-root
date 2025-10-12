import { SITE_URL } from '@/libs/constants';
import { metadataInstance } from '@/libs/metadata';
import { apiClient } from '@/libs/openapi-client';
import { SERVICE_NAME } from '@coldsurfers/shared-utils';
import type { Metadata } from 'next/types';
import { type ReactNode, cache } from 'react';

export const dynamic = 'force-dynamic';

const getArtistDetail = cache(async (artistId: string) => {
  return await apiClient.artist.getArtistDetail(artistId);
});

export const generateMetadata = async ({
  params,
}: { params: Promise<{ 'artist-id': string }> }) => {
  const pageParams = await params;
  const artistDetail = await getArtistDetail(pageParams['artist-id']);
  if (!artistDetail) {
    return undefined;
  }
  const title = `${artistDetail.name} 공연 정보 및 일정 | ${SERVICE_NAME}`;
  const description = `${SERVICE_NAME}에서 ${artistDetail.name}의 공연 일정과 정보를 확인하세요.\n지금 이 순간, 당신 근처에서 열리는 공연을 탐색해보세요.`;
  const meta = metadataInstance.generateMetadata<Metadata>({
    title,
    description,
    openGraph: {
      title,
      description,
    },
    keywords: [artistDetail.name],
  });

  return meta;
};

export default async function ArtistDetailPageLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ 'artist-id': string }>;
}) {
  const pageParams = await params;
  const artistDetail = await getArtistDetail(pageParams['artist-id']);
  if (!artistDetail) {
    return null;
  }
  return (
    <>
      {children}
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            metadataInstance.generateLdJson({
              type: 'PerformingGroup',
              image: artistDetail.thumbUrl ? `${artistDetail.thumbUrl}` : '',
              name: artistDetail.name,
              url: `${SITE_URL}/artist/${pageParams['artist-id']}`,
              events: artistDetail.upcomingEvents.map((event) => ({
                type: 'MusicEvent',
                url: `${SITE_URL}/event/${event.data.slug}`,
                name: event.data.title,
                startDate: event.data.date,
                endDate: event.data.date,
                images: event.data.mainPoster?.url ? [`${event.data.mainPoster.url}`] : [],
                description: '',
                venue: {
                  // @todo: expand api properties from backend side
                  name: event.data.mainVenue?.name ?? '',
                  address: '',
                  latitude: 0,
                  longitude: 0,
                },
                offers: [],
              })),
            })
          ),
        }}
      />
    </>
  );
}
