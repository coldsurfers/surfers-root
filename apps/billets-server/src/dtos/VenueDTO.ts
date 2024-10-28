import { prisma } from '../prisma/connect'
import { VenueProps } from './VenueDTO.types'

export default class VenueDTO {
  constructor(private readonly props: VenueProps) {
    this.props = props
  }

  static async findById(id: string) {
    const venue = await prisma.venue.findUnique({
      where: { id },
    })
    if (!venue) {
      return null
    }
    return new VenueDTO(venue)
  }

  get id() {
    return this.props.id
  }

  get name() {
    return this.props.name
  }
}
