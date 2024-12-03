import { useArtistQuery } from '@/lib/react-query'
import { useArtistDetailScreenRoute } from './artist-detail-screen.hooks'

export const ArtistDetailScreen = () => {
  const route = useArtistDetailScreenRoute()

  const { data: artistData } = useArtistQuery({
    id: route.params.artistId,
  })

  return null
}
