import { apiClient } from '@/libs/openapi-client'
import { ApiErrorBoundaryRegistry } from '@/libs/registries'
import { getQueryClient } from '@/libs/utils'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { RouteLoading } from 'app/(ui)'
import { redirect } from 'next/navigation'
import { cache } from 'react'
import { ArtistDetailEventList, ArtistDetailPageLayout, ArtistDetailTop } from './(ui)'

const getArtistDetail = cache((artistId: string) => apiClient.artist.getArtistDetail(artistId))

async function validateArtist(artistId: string) {
  try {
    const response = await getArtistDetail(artistId)
    return {
      isValid: true,
      data: response,
    }
  } catch (e) {
    return {
      isValid: false,
      data: null,
    } as const
  }
}

async function PageInner({ params }: { params: { ['artist-id']: string } }) {
  const artistId = (await params)['artist-id']
  const validation = await validateArtist(artistId)
  if (!validation.isValid) {
    return redirect('/404')
  }

  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: apiClient.artist.queryKeys.detail(artistId),
    queryFn: () => getArtistDetail(artistId),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ArtistDetailPageLayout>
        <ArtistDetailTop artistId={artistId} />
        <ArtistDetailEventList artistId={artistId} />
      </ArtistDetailPageLayout>
    </HydrationBoundary>
  )
}

export default async function ArtistDetailPage(pageProps: { params: Promise<{ ['artist-id']: string }> }) {
  return (
    <ApiErrorBoundaryRegistry>
      <RouteLoading>
        <PageInner params={await pageProps.params} />
      </RouteLoading>
    </ApiErrorBoundaryRegistry>
  )
}
