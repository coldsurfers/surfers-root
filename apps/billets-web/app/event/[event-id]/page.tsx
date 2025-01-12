import { GLOBAL_TIME_ZONE, SITE_URL } from '@/libs/constants'
import { apiClient } from '@/libs/openapi-client'
import { ApiErrorBoundaryRegistry } from '@/libs/registries'
import {
  formatPrice,
  generateBilletsLdJson,
  generateBilletsMetadata,
  getCheapestPrice,
  getCheapestTicketPrice,
  getQueryClient,
} from '@/libs/utils'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { format } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { PageProps } from 'types'
import { DownloadApp, Lineup, PageLayout, PosterThumbnail, TicketCta, TopInfo, Venue } from './(ui)'

async function validateEventIdParam(eventId: string) {
  if (!eventId) {
    return {
      isValid: false,
      data: null,
    } as const
  }
  try {
    const [concertData, venuesData, artistsData, ticketsData, postersData] = await Promise.all([
      apiClient.concert.getConcertById(eventId),
      apiClient.venue.getVenuesByConcertId(eventId),
      apiClient.artist.getArtistsByConcertId(eventId),
      apiClient.ticket.getTicketsByConcertId(eventId),
      apiClient.poster.getPostersByConcertId(eventId),
    ])

    const priceData = await Promise.all(
      ticketsData.map(async (ticket) => {
        const prices = await apiClient.price.getPricesByTicketId(ticket.id)
        return {
          ticket,
          prices,
        }
      }),
    )

    const data = {
      concert: concertData,
      venues: venuesData,
      artists: artistsData,
      tickets: ticketsData,
      posters: postersData,
      prices: priceData,
    }
    return {
      isValid: true,
      data,
    } as const
  } catch (e) {
    return {
      isValid: false,
      data: null,
    } as const
  }
}

export const revalidate = 600

export async function generateMetadata({ params }: PageProps<{ ['event-id']: string }>): Promise<Metadata> {
  const validation = await validateEventIdParam(params['event-id'])
  if (!validation.isValid) {
    return {
      title: 'Billets | Discover shows around the world',
      description:
        'Billets is a platform to find live shows around the world. Download Billets to see live shows in your city.',
    }
  }
  const { concert, venues, artists, tickets, posters, prices } = validation.data

  const zonedDate = toZonedTime(concert.date ? new Date(concert.date) : new Date(), GLOBAL_TIME_ZONE)
  const formattedDate = format(zonedDate, 'EEE, MMM d')
  const venueTitle = venues.at(0)?.name ?? ''
  const artistNamesString = artists.map((artist) => artist.name).join('\n')
  const cheapestPrice = getCheapestTicketPrice(
    prices.map((price) => ({
      openDate: price.ticket.openDate,
      prices: price.prices,
      seller: price.ticket.sellerName,
      url: price.ticket.url,
    })),
  )

  const metaTitle = `${concert.title} Tickets | ${formattedDate} @ ${venueTitle} | Billets`
  const metaDescription = `${venueTitle} presents\n\n${concert.title} on ${formattedDate}.\n\n${artistNamesString}\n\nGet your tickets now!`

  const metaOther = {
    'product:brand': tickets.at(0)?.sellerName ?? '',
    'product:availability': 'in stock',
    'product:condition': 'new',
    'product:price:amount': cheapestPrice?.price ?? 0,
    'product:price:currency': cheapestPrice?.currency ?? 'USD',
  }
  const metaKeywords = [
    venueTitle,
    ...artists.map((artist) => artist.name),
    concert.title,
    ...tickets.map((ticket) => ticket.sellerName),
  ]
  const metaImages = posters.map((poster) => {
    return {
      alt: poster.url,
      url: poster.url,
    }
  })

  return generateBilletsMetadata({
    title: metaTitle,
    description: metaDescription,
    other: metaOther,
    keywords: metaKeywords,
    openGraph: {
      type: 'website',
      title: metaTitle,
      description: metaDescription,
      images: metaImages,
      url: `https://billets.coldsurf.io/event/${params['event-id']}`,
    },
  })
}

async function PageInner({ params }: PageProps<{ ['event-id']: string }>) {
  const validation = await validateEventIdParam(params['event-id'])
  if (!validation.isValid) {
    return redirect('/404')
  }
  const queryClient = getQueryClient()

  try {
    await queryClient.prefetchQuery({
      queryKey: apiClient.concert.queryKeys.detail(params['event-id']),
      queryFn: () => apiClient.concert.getConcertById(params['event-id']),
    })
  } catch (e) {
    console.error(e)
  }

  const { tickets, posters, concert, venues, artists, prices } = validation.data
  const posterUrl = posters.at(0)?.url ?? ''
  const mainVenue = venues.at(0)
  const venueTitle = mainVenue?.name ?? ''

  const zonedDate = toZonedTime(concert.date ? new Date(concert.date) : new Date(), GLOBAL_TIME_ZONE)
  const formattedDate = format(zonedDate, 'MMM dd, hh:mm a')
  const ticketPromotes = tickets.map((ticket) => {
    const targetPrices = prices.filter((price) => price.ticket.id === ticket.id)
    const cheapestPrice = getCheapestPrice(targetPrices.map((price) => price.prices).flat())
    const formattedPrice = cheapestPrice ? formatPrice(cheapestPrice) : ''
    return {
      seller: ticket.sellerName,
      sellingURL: ticket.url,
      formattedLowestPrice: formattedPrice,
    }
  })
  const venueInfo = {
    address: mainVenue?.address ?? '',
    id: mainVenue?.id ?? '',
    latitude: mainVenue?.lat ?? 0,
    longitude: mainVenue?.lng ?? 0,
    venueTitle: mainVenue?.name ?? '',
  }

  const artistNamesString = artists.map((artist) => artist.name).join('\n')
  const metaDescription = `${venueTitle} presents\n\n${concert.title} on ${formattedDate}.\n\n${artistNamesString}\n\nGet your tickets now!`

  const concertDate = concert.date ? new Date(concert.date) : new Date()

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageLayout
        poster={<PosterThumbnail src={posterUrl} alt={concert.title} />}
        topInfo={<TopInfo title={concert.title} venueTitle={venueTitle} formattedDate={formattedDate} />}
        ticketCTA={<TicketCta ticketPromotes={ticketPromotes} />}
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
              name: concert.title,
              url: `${SITE_URL}/event/${params['event-id']}`,
              venue: {
                address: mainVenue?.address ?? '',
                latitude: mainVenue?.lat ?? 0,
                longitude: mainVenue?.lng ?? 0,
                name: mainVenue?.name ?? '',
              },
              images: posters.map((poster) => poster.url),
              offers: prices
                .map((price) => {
                  const { ticket, prices } = price
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
