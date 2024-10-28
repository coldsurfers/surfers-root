import { Price } from '@prisma/client'
import { prisma } from '..'

export default class PriceDTO {
  props: Partial<Price>

  constructor(props: Partial<Price>) {
    this.props = props
  }

  static async findMany({ ticketId }: { ticketId: string }) {
    const data = await prisma.price.findMany({
      where: {
        tickets: {
          every: {
            ticketId,
          },
        },
      },
    })

    return data.map((item) => new PriceDTO(item))
  }
}
