import { GLOBAL_TIME_ZONE, SITE_URL } from '@/libs/constants'
import { metadataInstance } from '@/libs/metadata'
import { initialPageQuery } from '@/libs/openapi-client'
import { ApiErrorBoundaryRegistry } from '@/libs/registries'
import { getQueryClient } from '@/libs/utils'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { RouteLoading } from 'app/(ui)'
import { format } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'
import { redirect } from 'next/navigation'
import { DownloadApp, Lineup, PageLayout, PosterThumbnail, TicketCta, TopInfo, Venue } from './(ui)'
import { getEventMetadata } from './(utils)'

async function PageInner({ params }: { params: { ['event-id']: string } }) {
  const meta = await getEventMetadata(params['event-id'])
  if (!meta) {
    return redirect('/404')
  }
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(initialPageQuery.eventDetail(params['event-id']))

  const { posters, venues, artists, date, ticketPromotion, title, isKOPIS, tickets } = meta.eventDetail
  // eslint-disable-next-line prettier/prettier
  const posterUrl = isKOPIS ? (posters.at(0)?.url ?? '') : (artists.at(0)?.thumbUrl ?? '')
  // eslint-disable-next-line prettier/prettier
  const posterCopyright = isKOPIS ? undefined : (artists.at(0)?.thumbCopyright ?? undefined)
  const mainVenue = venues.at(0)
  const venueTitle = mainVenue?.name ?? ''

  const zonedDate = toZonedTime(date ? new Date(date) : new Date(), GLOBAL_TIME_ZONE)
  const formattedDate = format(zonedDate, 'MMM dd, hh:mm a')

  const venueInfo = {
    address: mainVenue?.address ?? '',
    id: mainVenue?.id ?? '',
    latitude: mainVenue?.lat ?? 0,
    longitude: mainVenue?.lng ?? 0,
    venueTitle: mainVenue?.name ?? '',
  }

  const artistNamesString = artists.map((artist) => artist.name).join('\n')
  const metaDescription = `${venueTitle} presents\n\n${title} on ${formattedDate}.\n\n${artistNamesString}\n\nGet your tickets now!`

  const concertDate = new Date(date)

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageLayout
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
        lineup={artists.length > 0 && <Lineup artists={artists} />}
        venue={<Venue {...venueInfo} />}
        downloadApp={<DownloadApp />}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            metadataInstance.generateLdJson({
              type: 'MusicEvent',
              description: metaDescription,
              endDate: concertDate.toISOString(),
              startDate: concertDate.toISOString(),
              name: title,
              url: `${SITE_URL}/event/${params['event-id']}`,
              venue: {
                address: mainVenue?.address ?? '',
                latitude: mainVenue?.lat ?? 0,
                longitude: mainVenue?.lng ?? 0,
                name: mainVenue?.name ?? '',
              },
              images: posters.map((poster) => poster.url),
              offers: tickets
                .map((ticket) => {
                  const { prices } = ticket
                  return prices.map((price) => {
                    return {
                      currency: price.currency,
                      price: price.price,
                      url: ticket.url,
                      validFrom: new Date(ticket.openDate).toISOString(),
                      name: price.name,
                    }
                  })
                })
                .flat(),
            }),
          ),
        }}
      />
    </HydrationBoundary>
  )
}

export default async function EventDetailPage(props: { params: Promise<{ ['event-id']: string }> }) {
  const params = await props.params
  return (
    <ApiErrorBoundaryRegistry>
      <RouteLoading>
        <PageInner params={await params} />
      </RouteLoading>
    </ApiErrorBoundaryRegistry>
  )
}
