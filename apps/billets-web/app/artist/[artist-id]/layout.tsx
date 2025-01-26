import { SITE_NAME, SITE_URL } from '@/libs/constants'
import { metadataInstance } from '@/libs/metadata'
import { apiClient } from '@/libs/openapi-client'
import { Metadata } from 'next/types'
import { cache, ReactNode } from 'react'

export const dynamic = 'force-dynamic'

const getArtistDetail = cache(async (artistId: string) => {
  return await apiClient.artist.getArtistDetail(artistId)
})

export const generateMetadata = async ({ params }: { params: Promise<{ ['artist-id']: string }> }) => {
  const pageParams = await params
  const artistDetail = await getArtistDetail(pageParams['artist-id'])
  if (!artistDetail) {
    return undefined
  }
  const title = `${artistDetail.name} tickets and upcoming events | ${SITE_NAME}`
  const description = `Find tickets for ${artistDetail.name} on ${SITE_NAME}. Download the ${SITE_NAME} app and discover recommendations for events you'll like.`
  const meta = metadataInstance.generateMetadata<Metadata>({
    title,
    description,
    openGraph: {
      siteName: SITE_NAME,
      title,
      description,
    },
    keywords: [artistDetail.name],
  })

  return meta
}

export default async function ArtistDetailPageLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ ['artist-id']: string }>
}) {
  const pageParams = await params
  const artistDetail = await getArtistDetail(pageParams['artist-id'])
  if (!artistDetail) {
    return null
  }
  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            metadataInstance.generateLdJson({
              type: 'PerformingGroup',
              image: artistDetail.thumbUrl ? `${artistDetail.thumbUrl}&width=500&height=500&format=png` : '',
              name: artistDetail.name,
              url: `${SITE_URL}/artist/${pageParams['artist-id']}`,
              events: artistDetail.upcomingEvents.map((event) => ({
                type: 'MusicEvent',
                url: `${SITE_URL}/event/${event.data.id}`,
                name: event.data.title,
                startDate: event.data.date,
                endDate: event.data.date,
                images: event.data.mainPoster?.url
                  ? [`${event.data.mainPoster.url}&width=500&height=500&format=png`]
                  : [],
                description: '',
                venue: {
                  // @todo: expand api properties from backend side
                  name: event.data.mainVenue?.name ?? '',
                  address: '',
                  latitude: 0,
                  longitude: 0,
                },
                offers: [],
              })),
            }),
          ),
        }}
      />
    </>
  )
}
