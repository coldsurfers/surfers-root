import { apiClient } from '@/libs/openapi-client'
import { ApiErrorBoundaryRegistry } from '@/libs/registries'
import { getQueryClient } from '@/libs/utils'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { format } from 'date-fns'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { PageProps } from 'types'
import { Lineup, PageLayout, PosterThumbnail, TicketCta, TopInfo, Venue } from './(ui)'

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
  const { date, venues, title, artists } = validation.data

  const formattedDate = format(new Date(date), 'EEE, MMM d')
  const venueTitle = venues.at(0)?.venueTitle ?? ''
  const artistNames = artists.map((artist) => artist.name).join('\n')

  return {
    title: `${title} Tickets | ${formattedDate} @ ${venueTitle} | Billets`,
    description: `${venueTitle} presents\n\n${title} on ${formattedDate}.\n\n${artistNames}\n\nGet your tickets now!`,
  }
}

export async function PageInner({ params }: PageProps<{ ['event-id']: string }>) {
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
  const formattedDate = format(new Date(date), 'EEE, MMM d h:mm a')
  const ticketPromotes = tickets.map((ticket) => {
    const { prices } = ticket
    const cheapestPrice =
      prices.length > 0
        ? prices.reduce((min, current) => {
            return current.price < min.price ? current : min
          }, prices[0])
        : null
    const formattedPrice = cheapestPrice
      ? `${new Intl.NumberFormat('en-US', { style: 'currency', currency: cheapestPrice.currency }).format(
          cheapestPrice.price,
        )}`
      : ''
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
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageLayout
        poster={<PosterThumbnail src={posterUrl} alt={title} />}
        topInfo={<TopInfo title={title} venueTitle={venueTitle} formattedDate={formattedDate} />}
        ticketCTA={<TicketCta ticketPromotes={ticketPromotes} />}
        lineup={<Lineup lineupData={artists} />}
        venue={<Venue {...venueInfo} />}
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
