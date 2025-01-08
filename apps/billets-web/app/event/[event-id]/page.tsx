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
    const data = await apiClient.concerts.getConcertById(eventId)
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
  const { date, venues, title, artists, tickets, posters } = validation.data

  const zonedDate = toZonedTime(new Date(date), GLOBAL_TIME_ZONE)
  const formattedDate = format(zonedDate, 'EEE, MMM d')
  const venueTitle = venues.at(0)?.venueTitle ?? ''
  const artistNamesString = artists.map((artist) => artist.name).join('\n')
  const cheapestPrice = getCheapestTicketPrice(tickets)

  const metaTitle = `${title} Tickets | ${formattedDate} @ ${venueTitle} | Billets`
  const metaDescription = `${venueTitle} presents\n\n${title} on ${formattedDate}.\n\n${artistNamesString}\n\nGet your tickets now!`

  const metaOther = {
    'product:brand': tickets.at(0)?.seller ?? '',
    'product:availability': 'in stock',
    'product:condition': 'new',
    'product:price:amount': cheapestPrice?.price ?? 0,
    'product:price:currency': cheapestPrice?.currency ?? 'USD',
  }
  const metaKeywords = [
    venueTitle,
    ...artists.map((artist) => artist.name),
    title,
    ...tickets.map((ticket) => ticket.seller),
  ]
  const metaImages = posters.map((poster) => {
    return {
      alt: poster.imageUrl,
      url: poster.imageUrl,
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
      queryKey: apiClient.concerts.queryKeys.getConcertById(params['event-id']),
      queryFn: () => apiClient.concerts.getConcertById(params['event-id']),
    })
  } catch (e) {
    console.error(e)
  }

  const { tickets, posters, title, venues, date, artists } = validation.data
  const posterUrl = posters.at(0)?.imageUrl ?? ''
  const mainVenue = venues.at(0)
  const venueTitle = mainVenue?.venueTitle ?? ''

  const zonedDate = toZonedTime(new Date(date), GLOBAL_TIME_ZONE)

  const formattedDate = format(zonedDate, 'MMM dd, hh:mm a')
  const ticketPromotes = tickets.map((ticket) => {
    const { prices } = ticket
    const cheapestPrice = getCheapestPrice(prices)
    const formattedPrice = cheapestPrice ? formatPrice(cheapestPrice) : ''
    return {
      seller: ticket.seller,
      sellingURL: ticket.url,
      formattedLowestPrice: formattedPrice,
    }
  })
  const venueInfo = {
    address: mainVenue?.address ?? '',
    id: mainVenue?.id ?? '',
    latitude: mainVenue?.latitude ?? 0,
    longitude: mainVenue?.longitude ?? 0,
    venueTitle: mainVenue?.venueTitle ?? '',
  }

  const artistNamesString = artists.map((artist) => artist.name).join('\n')
  const metaDescription = `${venueTitle} presents\n\n${title} on ${formattedDate}.\n\n${artistNamesString}\n\nGet your tickets now!`

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageLayout
        poster={<PosterThumbnail src={posterUrl} alt={title} />}
        topInfo={<TopInfo title={title} venueTitle={venueTitle} formattedDate={formattedDate} />}
        ticketCTA={<TicketCta ticketPromotes={ticketPromotes} />}
        lineup={<Lineup lineupData={artists} />}
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
              endDate: new Date(date).toISOString(),
              startDate: new Date(date).toISOString(),
              name: title,
              url: `${SITE_URL}/event/${params['event-id']}`,
              venue: {
                address: mainVenue?.address ?? '',
                latitude: mainVenue?.latitude ?? 0,
                longitude: mainVenue?.longitude ?? 0,
                name: mainVenue?.venueTitle ?? '',
              },
              images: posters.map((poster) => poster.imageUrl),
              offers: tickets
                .map((ticket) => {
                  const { prices } = ticket
                  return prices.map((price) => {
                    return {
                      currency: price.currency,
                      price: price.price,
                      url: ticket.url,
                      validFrom: new Date(ticket.openDate).toISOString(),
                      name: price.title,
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
