import { ArtistDTO } from '@/dtos/artist.dto'
import { dbClient } from '@/lib/db/db.client'
import { ArtistRepository } from './artist.repository'

interface ArtistModel {
  id: string
  name: string
  artistProfileImage: ({
    copyright: {
      id: string
      createdAt: Date
      owner: string
      license: string
      licenseURL: string
    } | null
  } & {
    id: string
    createdAt: Date
    imageURL: string
    artistId: string
    copyrightId: string | null
  })[]
}

export class ArtistRepositoryImpl implements ArtistRepository {
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

  private toDTO(artist: ArtistModel): ArtistDTO {
    return {
      id: artist.id,
      name: artist.name,
      artistProfileImage: artist.artistProfileImage.map((profileImage) => {
        return {
          id: profileImage.id,
          imageURL: profileImage.imageURL,
          copyright: profileImage.copyright,
        }
      }),
    }
  }
}
