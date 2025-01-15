import { GLOBAL_TIME_ZONE, SITE_URL } from '@/libs/constants'
import { metadataInstance } from '@/libs/metadata'
import { apiClient } from '@/libs/openapi-client'
import { ApiErrorBoundaryRegistry } from '@/libs/registries'
import { formatPrice, generateBilletsLdJson, getQueryClient } from '@/libs/utils'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { format } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { PageProps } from 'types'
import { DownloadApp, Lineup, PageLayout, PosterThumbnail, TicketCta, TopInfo, Venue } from './(ui)'

async function getEventMetadata(eventId: string) {
  if (!eventId) {
    return null
  }
  try {
    const eventDetailData = await apiClient.event.getEventDetail(eventId)
    if (!eventDetailData) {
      return null
    }
    if (eventDetailData.type !== 'concert') {
      return null
    }
    const ticketsData = await apiClient.ticket.getTicketsByEventId(eventId)
    return {
      eventDetail: eventDetailData.data,
      tickets: ticketsData,
    }
  } catch (e) {
    console.error(e)
    return null
  }
}

export const revalidate = 600

export async function generateMetadata({ params }: PageProps<{ ['event-id']: string }>): Promise<Metadata> {
  const meta = await getEventMetadata(params['event-id'])
  if (!meta) {
    return {
      title: 'Billets | Discover shows around the world',
      description:
        'Billets is a platform to find live shows around the world. Download Billets to see live shows in your city.',
    }
  }
  const { venues, artists, ticketPromotion, posters, title, date } = meta.eventDetail
  const { tickets } = meta

  const zonedDate = toZonedTime(new Date(date), GLOBAL_TIME_ZONE)
  const formattedDate = format(zonedDate, 'EEE, MMM d')
  const venueTitle = venues.at(0)?.name ?? ''
  const artistNamesString = artists.map((artist) => artist.name).join('\n')

  const metaTitle = `${title} Tickets | ${formattedDate} @ ${venueTitle} | Billets`
  const metaDescription = `${venueTitle} presents\n\n${title} on ${formattedDate}.\n\n${artistNamesString}\n\nGet your tickets now!`

  const metaOther = {
    'product:brand': ticketPromotion?.sellerName ?? '',
    'product:availability': 'in stock',
    'product:condition': 'new',
    'product:price:amount': ticketPromotion?.price?.price ?? 0,
    'product:price:currency': ticketPromotion?.price?.currency ?? 'USD',
  }
  const metaKeywords = [
    venueTitle,
    ...artists.map((artist) => artist.name),
    title,
    ...tickets.map((ticket) => ticket.sellerName),
  ]
  const metaImages = posters.map((poster) => {
    return {
      alt: poster.url,
      url: poster.url,
    }
  })

  const openGraph: Metadata['openGraph'] = {
    type: 'website',
    title: metaTitle,
    description: metaDescription,
    images: metaImages,
    url: `https://billets.coldsurf.io/event/${params['event-id']}`,
  }

  return metadataInstance.generateMetadata<Metadata>({
    title: metaTitle,
    description: metaDescription,
    other: metaOther,
    keywords: metaKeywords,
    openGraph,
  })
}

async function PageInner({ params }: PageProps<{ ['event-id']: string }>) {
  const meta = await getEventMetadata(params['event-id'])
  if (!meta) {
    return redirect('/404')
  }
  const queryClient = getQueryClient()

  try {
    await queryClient.prefetchQuery({
      queryKey: apiClient.event.queryKeys.detail(params['event-id']),
      queryFn: () => apiClient.event.getEventDetail(params['event-id']),
    })
  } catch (e) {
    console.error(e)
  }

  const { posters, venues, artists, date, ticketPromotion, title } = meta.eventDetail
  const { tickets } = meta
  const posterUrl = posters.at(0)?.url ?? ''
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
        poster={<PosterThumbnail src={posterUrl} alt={title} />}
        topInfo={<TopInfo title={title} venueTitle={venueTitle} formattedDate={formattedDate} />}
        ticketCTA={
          ticketPromotion &&
          ticketPromotion.price && (
            <TicketCta
              ticketPromotion={{
                formattedLowestPrice: formatPrice(ticketPromotion.price),
                sellingURL: ticketPromotion.url,
                seller: ticketPromotion.sellerName,
              }}
            />
          )
        }
        lineup={<Lineup artists={artists} />}
        venue={<Venue {...venueInfo} />}
        downloadApp={<DownloadApp />}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBilletsLdJson({
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

export default async function EventDetailPage(props: PageProps<{ ['event-id']: string }>) {
  return (
    <ApiErrorBoundaryRegistry>
      <PageInner {...props} />
    </ApiErrorBoundaryRegistry>
  )
}
