import { GLOBAL_TIME_ZONE, SITE_URL } from '@/libs/constants'
import { metadataInstance } from '@/libs/metadata'
import { format } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'
import { Metadata } from 'next'
import { ReactNode } from 'react'
import { getEventMetadata } from './(utils)'

export async function generateMetadata({ params }: { params: Promise<{ ['event-id']: string }> }): Promise<Metadata> {
  const pageParams = await params
  const meta = await getEventMetadata(pageParams['event-id'])
  if (!meta) {
    return {
      title: 'Billets | Discover shows around the world',
      description:
        'Billets is a platform to find live shows around the world. Download Billets to see live shows in your city.',
    }
  }
  const { venues, artists, ticketPromotion, posters, title, date, tickets } = meta.eventDetail

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
    url: `${SITE_URL}/event/${pageParams['event-id']}`,
  }

  return metadataInstance.generateMetadata<Metadata>({
    title: metaTitle,
    description: metaDescription,
    other: metaOther,
    keywords: metaKeywords,
    openGraph,
  })
}

export default function EventDetailLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
