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

  async findSubscribedArtist(params: { artistId: string; userId: string }): Promise<ArtistDTO | null> {
    const subscribedArtist = await dbClient.usersOnSubscribedArtists.findFirst({
      where: {
        artistId: params.artistId,
        userId: params.userId,
      },
      include: {
        artist: {
          include: {
            artistProfileImage: {
              include: {
                copyright: true,
              },
            },
          },
        },
      },
    })
    return subscribedArtist ? this.toDTO(subscribedArtist.artist) : null
  }

  async subscribe(params: { userId: string; artistId: string }): Promise<ArtistDTO> {
    const subscribedArtist = await dbClient.usersOnSubscribedArtists.create({
      data: {
        artistId: params.artistId,
        userId: params.userId,
      },
      include: {
        artist: {
          include: {
            artistProfileImage: {
              include: {
                copyright: true,
              },
            },
          },
        },
      },
    })
    return this.toDTO(subscribedArtist.artist)
  }

  async unsubscribe(params: { userId: string; artistId: string }): Promise<ArtistDTO> {
    const subscribedArtist = await dbClient.usersOnSubscribedArtists.delete({
      where: {
        userId_artistId: {
          artistId: params.artistId,
          userId: params.userId,
        },
      },
      include: {
        artist: {
          include: {
            artistProfileImage: {
              include: {
                copyright: true,
              },
            },
          },
        },
      },
    })
    return this.toDTO(subscribedArtist.artist)
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
