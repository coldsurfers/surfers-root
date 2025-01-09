import { dbClient } from '@/lib/db'
import { SubscribeVenueProps, SubscribeVenueSerialized } from './subscribe-venue-dto.types'

export class SubscribeVenueDTO {
  constructor(private readonly props: SubscribeVenueProps) {
    this.props = props
  }

  static async findByVenueIdUserId(venueId: string, userId: string) {
    const subscribedVenue = await dbClient.usersOnSubscribedVenues.findFirst({
      where: {
        venueId,
        userId,
      },
    })
    if (!subscribedVenue) {
      return null
    }
    return new SubscribeVenueDTO(subscribedVenue)
  }

  async subscribeVenue() {
    if (!this.props.userId || !this.props.venueId) {
      throw new Error('userId or venueId is required')
    }
    const data = await dbClient.usersOnSubscribedVenues.create({
      data: {
        userId: this.props.userId,
        venueId: this.props.venueId,
      },
    })
    return new SubscribeVenueDTO(data)
  }

  async unsubscribeVenue() {
    if (!this.props.userId || !this.props.venueId) {
      throw new Error('userId or venueId is required')
    }
    const data = await dbClient.usersOnSubscribedVenues.delete({
      where: {
        userId_venueId: {
          userId: this.props.userId,
          venueId: this.props.venueId,
        },
      },
    })
    return new SubscribeVenueDTO(data)
  }

  serialize(): SubscribeVenueSerialized {
    return {
      venueId: this.props.venueId ?? '',
      userId: this.props.userId ?? '',
    }
  }
}
