import {
  COMMON_META_DESCRIPTION,
  COMMON_META_TITLE,
  GLOBAL_TIME_ZONE,
  SITE_URL,
} from '@/libs/constants';
import { metadataInstance } from '@/libs/metadata';
import { apiClient, initialPageQuery } from '@/libs/openapi-client';
import { ApiErrorBoundaryRegistry } from '@/libs/registries';
import { getQueryClient } from '@/libs/utils';
import { generateSlugHref } from '@/libs/utils/utils.slug';
import { SERVICE_NAME } from '@coldsurfers/shared-utils';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { RouteLoading } from 'app/(ui)';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import {
  DownloadApp,
  Lineup,
  PageLayout,
  PosterThumbnail,
  TicketCta,
  TopInfo,
  Venue,
} from './(ui)';
import { About } from './(ui)/about';

async function getEventMetadata(slug: string) {
  if (!slug) {
    return null;
  }
  try {
    const eventDetailData = await apiClient.event.getEventDetailBySlug(decodeURIComponent(slug));
    if (!eventDetailData) {
      return null;
    }
    if (eventDetailData.type !== 'concert') {
      return null;
    }
    return {
      eventDetail: eventDetailData.data,
    };
  } catch (e) {
    console.error(e);
    return null;
  }
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const pageParams = await params;
  const meta = await getEventMetadata(pageParams.slug);
  if (!meta) {
    return {
      title: COMMON_META_TITLE,
      description: COMMON_META_DESCRIPTION,
    };
  }
  const { venues, artists, ticketPromotion, posters, title, date, tickets } = meta.eventDetail;

  const zonedDate = toZonedTime(new Date(date), GLOBAL_TIME_ZONE);
  const formattedDate = format(zonedDate, 'EEE, MMM d');
  const venueTitle = venues.at(0)?.name ?? '';
  const artistNamesString = artists.map((artist) => artist.name).join('\n');

  const metaTitle = `${title} - ${formattedDate}, ${venueTitle} | ${SERVICE_NAME} 공연 정보`;
  const metaDescription = `${formattedDate}에 ${venueTitle}에서 열리는 ${title}.\n\n출연: ${artistNamesString}\n\n${SERVICE_NAME}에서 공연 정보를 확인하고 티켓 구매처로 연결됩니다.`;

  const metaOther = {
    'product:brand': ticketPromotion?.sellerName ?? '',
    'product:availability': 'in stock',
    'product:condition': 'new',
    'product:price:amount': ticketPromotion?.price?.price ?? 0,
    'product:price:currency': ticketPromotion?.price?.currency ?? 'USD',
  };
  const metaKeywords = [
    venueTitle,
    ...artists.map((artist) => artist.name),
    title,
    ...tickets.map((ticket) => ticket.sellerName),
  ];
  const metaImages = posters.map((poster) => {
    return {
      alt: poster.url,
      url: poster.url,
    };
  });

  const openGraph: Metadata['openGraph'] = {
    type: 'website',
    title: metaTitle,
    description: metaDescription,
    images: metaImages,
    url: `https://billets.coldsurf.io${generateSlugHref(pageParams.slug)}`,
  };

  return metadataInstance.generateMetadata<Metadata>({
    title: metaTitle,
    description: metaDescription,
    other: metaOther,
    keywords: metaKeywords,
    openGraph,
  });
}

async function PageInner({ params }: { params: { slug: string } }) {
  const meta = await getEventMetadata(params.slug);
  if (!meta) {
    return redirect('/404');
  }
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(initialPageQuery.eventDetailBySlug(params.slug));

  const {
    posters,
    venues,
    artists,
    date,
    ticketPromotion,
    title,
    isKOPIS,
    tickets,
    detailImages,
    id: eventId,
  } = meta.eventDetail;
  // eslint-disable-next-line prettier/prettier
  const posterUrl = isKOPIS ? (posters.at(0)?.url ?? '') : (artists.at(0)?.thumbUrl ?? '');
  // eslint-disable-next-line prettier/prettier
  const posterCopyright = isKOPIS ? undefined : (artists.at(0)?.thumbCopyright ?? undefined);
  const mainVenue = venues.at(0);
  const venueTitle = mainVenue?.name ?? '';

  const zonedDate = toZonedTime(date ? new Date(date) : new Date(), GLOBAL_TIME_ZONE);
  const formattedDate = format(zonedDate, 'MMM dd, hh:mm a');

  const venueInfo = {
    address: mainVenue?.address ?? '',
    id: mainVenue?.id ?? '',
    latitude: mainVenue?.lat ?? 0,
    longitude: mainVenue?.lng ?? 0,
    venueTitle: mainVenue?.name ?? '',
  };

  const artistNamesString = artists.map((artist) => artist.name).join('\n');
  const metaDescription = `${venueTitle} presents\n\n${title} on ${formattedDate}.\n\n${artistNamesString}\n\nGet your tickets now!`;

  const concertDate = new Date(date);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageLayout
        eventId={eventId}
        poster={<PosterThumbnail src={posterUrl} alt={title} copyright={posterCopyright} />}
        topInfo={
          <TopInfo
            title={title}
            venueTitle={venueTitle}
            formattedDate={formattedDate}
            venueId={venueInfo.id}
            isKOPIS={isKOPIS}
          />
        }
        ticketCTA={
          ticketPromotion && (
            <TicketCta
              tickets={tickets.map((ticket) => ({
                seller: ticket.sellerName,
                sellingURL: ticket.url,
              }))}
            />
          )
        }
        about={
          Array.isArray(detailImages) && detailImages.length > 0 ? (
            <About detailImages={detailImages} />
          ) : null
        }
        lineup={artists.length > 0 && <Lineup artists={artists} />}
        venue={<Venue {...venueInfo} />}
        downloadApp={<DownloadApp />}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            metadataInstance.generateLdJson({
              type: 'MusicEvent',
              description: metaDescription,
              endDate: concertDate.toISOString(),
              startDate: concertDate.toISOString(),
              name: title,
              url: `${SITE_URL}${generateSlugHref(params.slug)}`,
              venue: {
                address: mainVenue?.address ?? '',
                latitude: mainVenue?.lat ?? 0,
                longitude: mainVenue?.lng ?? 0,
                name: mainVenue?.name ?? '',
              },
              images: posters.map((poster) => poster.url),
              offers: tickets.flatMap((ticket) => {
                const { prices } = ticket;
                return prices.map((price) => {
                  return {
                    currency: price.currency,
                    price: price.price,
                    url: ticket.url,
                    validFrom: new Date(ticket.openDate).toISOString(),
                    name: price.name,
                  };
                });
              }),
            })
          ),
        }}
      />
    </HydrationBoundary>
  );
}

export default async function EventDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  return (
    <ApiErrorBoundaryRegistry>
      <RouteLoading>
        <PageInner params={await params} />
      </RouteLoading>
    </ApiErrorBoundaryRegistry>
  );
}
