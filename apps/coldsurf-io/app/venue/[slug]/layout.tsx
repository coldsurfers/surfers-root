import { SITE_URL } from '@/libs/constants';
import { metadataInstance } from '@/libs/metadata';
import { apiClient } from '@/libs/openapi-client';
import { SERVICE_NAME } from '@coldsurfers/shared-utils';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { type ReactNode, cache } from 'react';

export const dynamic = 'force-dynamic';

const getVenueDetailBySlug = cache(async (slug: string) => {
  return await apiClient.venue.getVenueDetailBySlug(slug);
});

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> => {
  const pageParams = await params;
  const slug = decodeURIComponent(pageParams.slug);
  const venueDetail = await getVenueDetailBySlug(slug);
  if (!venueDetail) {
    return undefined;
  }
  const title = `${venueDetail.name} 공연 일정 및 정보 | ${SERVICE_NAME}`;
  const description = `${venueDetail.name}에서 열리는 공연 정보를 ${SERVICE_NAME}에서 확인하세요.\n당신 근처에서 지금 열리는 공연과 예술을 탐색해보세요.`;
  const meta = metadataInstance.generateMetadata<Metadata>({
    title,
    description,
    openGraph: {
      title,
      description,
    },
    keywords: [venueDetail.name],
  });

  return meta;
};

export default async function VenueDetailPageLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const pageParams = await params;
  const slug = decodeURIComponent(pageParams.slug);
  const venueDetail = await getVenueDetailBySlug(slug);
  if (!venueDetail) {
    return redirect('/404');
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
              type: 'Place',
              address: venueDetail.address,
              latitude: venueDetail.lat,
              longitude: venueDetail.lng,
              name: venueDetail.name,
              url: `${SITE_URL}/venue/${slug}`,
              events: venueDetail.upcomingEvents.map((event) => ({
                type: 'MusicEvent',
                url: `${SITE_URL}/event/${event.data.slug}`,
                name: event.data.title,
                startDate: event.data.date,
                endDate: event.data.date,
                venue: {
                  name: event.data.mainVenue?.name ?? '',
                  address: venueDetail.address,
                  latitude: venueDetail.lat,
                  longitude: venueDetail.lng,
                },
                images: event.data.mainPoster?.url ? [event.data.mainPoster.url] : [],
                description: '',
                offers: [],
              })),
              description: venueDetail.memo ?? '',
            })
          ),
        }}
      />
    </>
  );
}
