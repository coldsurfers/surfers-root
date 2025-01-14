import { ArtistDTO } from '@/dtos/artist.dto'
import { dbClient } from '@/lib/db/db.client'
import { Artist, ArtistProfileImage } from '@prisma/client'
import { ArtistRepository } from './artist.repository'

interface ArtistModel extends Artist {
  artistProfileImage: ArtistProfileImage[]
}

export class ArtistRepositoryImpl implements ArtistRepository {
  async findManyByConcertId(concertId: string): Promise<ArtistDTO[]> {
    const artists = await dbClient.artist.findMany({
      where: {
        concerts: {
          some: {
            concertId,
          },
        },
      },
      include: {
        artistProfileImage: true,
      },
    })
    return artists.map(this.toDTO)
  }
  async findById(id: string): Promise<ArtistDTO | null> {
    const artist = await dbClient.artist.findUnique({
      where: {
        id,
      },
      include: {
        artistProfileImage: {
          include: {
            copyright: true,
          },
        },
      },
    })
    return artist ? this.toDTO(artist) : null
  }

  private toDTO(model: ArtistModel): ArtistDTO {
    const mainProfileImage = model.artistProfileImage.at(0)
    return {
      id: model.id,
      name: model.name,
      thumbUrl: mainProfileImage ? mainProfileImage.imageURL : null,
    }
  }
}
