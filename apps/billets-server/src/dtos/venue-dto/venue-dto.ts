import { prisma } from '@/prisma/connect'
import { z } from 'zod'
import { VenueDTOProps, venueDTOSerializedSchema } from './venue-dto.types'

export class VenueDTO {
  constructor(private readonly props: VenueDTOProps) {
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

  public serialize(): z.infer<typeof venueDTOSerializedSchema> {
    const validation = venueDTOSerializedSchema.safeParse(this.props)
    if (!validation.success) {
      throw validation.error
    }
    return validation.data
  }
}
