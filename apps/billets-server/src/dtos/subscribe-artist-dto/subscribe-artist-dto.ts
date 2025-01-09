import { dbClient } from '@/lib/db'
import { SubscribeArtistDTOProps, SubscribedArtistSerialized } from './subscribe-artist-dto.types'

export class SubscribeArtistDTO {
  constructor(private readonly props: SubscribeArtistDTOProps) {
    this.props = props
  }

  static async findByArtistIdUserId(artistId: string, userId: string) {
    const subscribedArtist = await dbClient.usersOnSubscribedArtists.findFirst({
      where: {
        artistId,
        userId,
      },
    })
    if (!subscribedArtist) {
      return null
    }
    return new SubscribeArtistDTO(subscribedArtist)
  }

  get artistId() {
    return this.props.artistId
  }

  get userId() {
    return this.props.userId
  }

  async subscribeArtist() {
    if (!this.props.artistId || !this.props.userId) {
      throw new Error('ArtistId or UserId is undefined')
    }
    const subscribedArtist = await dbClient.usersOnSubscribedArtists.create({
      data: {
        artistId: this.props.artistId,
        userId: this.props.userId,
      },
    })
    return new SubscribeArtistDTO(subscribedArtist)
  }

  async unsubscribeArtist() {
    if (!this.props.artistId || !this.props.userId) {
      throw new Error('ArtistId or UserId is undefined')
    }
    const subscribedArtist = await dbClient.usersOnSubscribedArtists.delete({
      where: {
        userId_artistId: {
          userId: this.props.userId,
          artistId: this.props.artistId,
        },
      },
    })
    return new SubscribeArtistDTO(subscribedArtist)
  }

  serialize(): SubscribedArtistSerialized {
    return {
      artistId: this.props.artistId ?? '',
      userId: this.props.userId ?? '',
    }
  }
}
