'use client'

import { apiClient } from '@/libs/openapi-client'
import { useQuery } from '@tanstack/react-query'

export function ArtistDetailTop({ artistId }: { artistId: string }) {
  const { data: artistDetail } = useQuery({
    queryKey: apiClient.artist.queryKeys.detail(artistId),
    queryFn: () => apiClient.artist.getArtistDetail(artistId),
  })
  return <p>{artistDetail?.name}</p>
}
