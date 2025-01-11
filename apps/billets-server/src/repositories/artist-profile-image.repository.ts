import { ArtistProfileImageDTO } from '@/dtos/artist-profile-image.dto'

export interface ArtistProfileImageRepository {
  findManyByArtistId(artistId: string): Promise<ArtistProfileImageDTO[]>
}
