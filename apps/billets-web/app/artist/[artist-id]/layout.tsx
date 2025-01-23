import { SITE_NAME } from '@/libs/constants'
import { metadataInstance } from '@/libs/metadata'
import { apiClient } from '@/libs/openapi-client'
import { Metadata } from 'next/types'
import { cache, PropsWithChildren } from 'react'
import { PageProps } from 'types/common-types'

const getArtistDetail = cache(async (artistId: string) => {
  return await apiClient.artist.getArtistDetail(artistId)
})

export const generateMetadata = async ({ params }: PageProps<{ ['artist-id']: string }>) => {
  const artistDetail = await getArtistDetail(params['artist-id'])
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

export default function ArtistDetailPageLayout({ children }: PropsWithChildren) {
  return <>{children}</>
}
