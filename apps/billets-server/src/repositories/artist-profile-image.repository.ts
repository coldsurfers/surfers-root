import { ArtistProfileImageDetailDTO } from '@/dtos/artist-profile-image-detail.dto'
import { ArtistProfileImageDTO } from '@/dtos/artist-profile-image.dto'

export interface ArtistProfileImageRepository {
  findMany(params: { artistId: string }): Promise<ArtistProfileImageDTO[]>
  findOne(params: { artistProfileImageId: string }): Promise<ArtistProfileImageDetailDTO | null>
}
