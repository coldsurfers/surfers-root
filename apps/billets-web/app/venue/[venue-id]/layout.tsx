import { SITE_NAME, SITE_URL } from '@/libs/constants'
import { metadataInstance } from '@/libs/metadata'
import { apiClient } from '@/libs/openapi-client'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { cache, ReactNode } from 'react'

const getVenueDetail = cache(async (venueId: string) => {
  return await apiClient.venue.getVenueDetail(venueId)
})

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ ['venue-id']: string }>
}): Promise<Metadata | undefined> => {
  const pageParams = await params
  const venueDetail = await getVenueDetail(pageParams['venue-id'])
  if (!venueDetail) {
    return undefined
  }
  const title = `${venueDetail.name} tickets and upcoming events | ${SITE_NAME}`
  const description = `Find tickets at ${venueDetail.name} on ${SITE_NAME}. Download the ${SITE_NAME} app and discover recommendations for events you'll like.`
  const meta = metadataInstance.generateMetadata<Metadata>({
    title,
    description,
    openGraph: {
      siteName: SITE_NAME,
      title,
      description,
    },
    keywords: [venueDetail.name],
  })

  return meta
}

export default async function VenueDetailPageLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ ['venue-id']: string }>
}) {
  const pageParams = await params
  const venueDetail = await getVenueDetail(pageParams['venue-id'])
  if (!venueDetail) {
    return redirect('/404')
  }

  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            metadataInstance.generateLdJson({
              type: 'Place',
              address: venueDetail.address,
              latitude: venueDetail.lat,
              longitude: venueDetail.lng,
              name: venueDetail.name,
              url: `${SITE_URL}/venue/${pageParams['venue-id']}`,
              events: venueDetail.upcomingEvents.map((event) => ({
                type: 'MusicEvent',
                url: `${SITE_URL}/event/${event.data.id}`,
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
            }),
          ),
        }}
      />
    </>
  )
}
