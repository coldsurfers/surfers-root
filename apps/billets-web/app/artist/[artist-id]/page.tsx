import { apiClient } from '@/libs/openapi-client'
import { ApiErrorBoundaryRegistry } from '@/libs/registries'
import { getQueryClient } from '@/libs/utils'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { redirect } from 'next/navigation'
import { cache } from 'react'
import { PageProps } from 'types/common-types'
import { ArtistDetailPageLayout } from './(ui)'

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

async function PageInner({ params }: PageProps<{ ['artist-id']: string }>) {
  const artistId = params['artist-id']
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
      <ArtistDetailPageLayout></ArtistDetailPageLayout>
    </HydrationBoundary>
  )
}

export default function ArtistDetailPage(pageProps: PageProps<{ ['artist-id']: string }>) {
  return (
    <ApiErrorBoundaryRegistry>
      <PageInner {...pageProps} />
    </ApiErrorBoundaryRegistry>
  )
}
