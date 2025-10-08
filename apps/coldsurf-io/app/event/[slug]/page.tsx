import { ShareButton } from '@/features';
import { GLOBAL_TIME_ZONE, SITE_URL } from '@/libs/constants';
import { metadataInstance } from '@/libs/metadata';
import { initialPageQuery } from '@/libs/openapi-client';
import { ApiErrorBoundaryRegistry } from '@/libs/registries';
import { getQueryClient } from '@/libs/utils';
import { generateSlugHref } from '@/libs/utils/utils.slug';
import { createSlugHashtag } from '@coldsurfers/shared-utils';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { RouteLoading } from 'app/(ui)';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { redirect } from 'next/navigation';
import {
  About,
  DownloadApp,
  Lineup,
  PageLayout,
  PosterThumbnail,
  TicketCta,
  TopInfo,
  Venue,
} from './(ui)';
import { generateEventDetailMetadata } from './(utils)';

async function PageInner({ params }: { params: { slug: string } }) {
  const eventDetailMetadata = await generateEventDetailMetadata(params.slug);
  if (!eventDetailMetadata || !eventDetailMetadata.eventDetailData) {
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
  } = eventDetailMetadata.eventDetailData;
  const { description: metaDescription } = eventDetailMetadata;
  // eslint-disable-next-line prettier/prettier
  const posterUrl = isKOPIS ? (posters.at(0)?.url ?? '') : (artists.at(0)?.thumbUrl ?? '');
  // eslint-disable-next-line prettier/prettier
  const posterCopyright = isKOPIS ? undefined : (artists.at(0)?.thumbCopyright ?? undefined);
  const mainVenue = venues.at(0);
  const venueTitle = mainVenue?.name ?? '';

  const pageUrl = `${SITE_URL}${generateSlugHref(params.slug)}`;

  const zonedDate = toZonedTime(date ? new Date(date) : new Date(), GLOBAL_TIME_ZONE);
  const formattedDate = format(zonedDate, 'MMM dd, hh:mm a');

  const venueInfo = {
    address: mainVenue?.address ?? '',
    id: mainVenue?.id ?? '',
    latitude: mainVenue?.lat ?? 0,
    longitude: mainVenue?.lng ?? 0,
    venueTitle: mainVenue?.name ?? '',
    slug: mainVenue?.slug ?? '',
  };

  const metaDescriptionForTwitter = (() => {
    let metaString = `${venueTitle}에서 주최하는\n${title}.`;
    if (artists.length > 0) {
      const artistNamesString = artists.map((artist) => artist.name).join('\n');
      metaString += `\n${artistNamesString}`;
    }
    const formattedDateString = format(zonedDate, 'yyyy년 MM월 dd일 hh시 mm분 a');
    metaString += `\n${formattedDateString}에 만나요!`;
    return metaString;
  })();

  const concertDate = new Date(date);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageLayout
        eventId={eventId}
        poster={
          <PosterThumbnail
            src={posterUrl}
            alt={title}
            copyright={posterCopyright}
            eventId={eventId}
            shareButtonsAccessory={
              <>
                <ShareButton
                  type="twitter"
                  text={metaDescriptionForTwitter}
                  url={pageUrl}
                  hashtags={[
                    createSlugHashtag(title),
                    createSlugHashtag(venueTitle),
                    'COLDSURF',
                    '공연',
                  ]}
                  via="COLDSURF_IO"
                />
                <ShareButton type="facebook" quote={metaDescription} url={pageUrl} />
                <ShareButton type="copy-link" url={pageUrl} />
              </>
            }
          />
        }
        topInfo={
          <TopInfo
            title={title}
            venueTitle={venueTitle}
            formattedDate={formattedDate}
            venueSlug={venueInfo.slug}
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
              url: pageUrl,
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
        <PageInner
          params={{
            slug: decodeURIComponent(params.slug),
          }}
        />
      </RouteLoading>
    </ApiErrorBoundaryRegistry>
  );
}
