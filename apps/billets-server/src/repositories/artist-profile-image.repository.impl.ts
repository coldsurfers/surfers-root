import { ArtistProfileImageDTO } from '@/dtos/artist-profile-image.dto'
import { dbClient } from '@/lib/db'
import { ArtistProfileImage } from '@prisma/client'
import { ArtistProfileImageRepository } from './artist-profile-image.repository'

export class ArtistProfileImageRepositoryImpl implements ArtistProfileImageRepository {
  async findManyByArtistId(artistId: string): Promise<ArtistProfileImageDTO[]> {
    const data = await dbClient.artistProfileImage.findMany({
      where: {
        artistId,
      },
    })
    return data.map((value) => this.toDTO(value))
  }

  private toDTO(model: ArtistProfileImage): ArtistProfileImageDTO {
    return {
      url: model.imageURL,
    }
  }
}
