import { SITE_NAME } from '@/libs/constants'
import { metadataInstance } from '@/libs/metadata'
import { apiClient } from '@/libs/openapi-client'
import { Metadata } from 'next'
import { cache, PropsWithChildren } from 'react'
import { PageProps } from 'types'

const getVenueDetail = cache(async (venueId: string) => {
  return await apiClient.venue.getVenueDetail(venueId)
})

export const generateMetadata = async ({
  params,
}: PageProps<{ ['venue-id']: string }>): Promise<Metadata | undefined> => {
  const venueDetail = await getVenueDetail(params['venue-id'])
  if (!venueDetail) {
    return undefined
  }
  const title = `${venueDetail.name} tickets and upcoming events | ${SITE_NAME}`
  const description = `Find out more tickets and upcoming events at ${venueDetail.name}`
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

export default function VenueDetailPageLayout({ children }: PropsWithChildren) {
  return <>{children}</>
}
