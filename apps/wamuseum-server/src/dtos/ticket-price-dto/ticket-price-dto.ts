import { Price } from '@prisma/client'
import { prisma } from '../..'
import { TicketPrice } from '../../../gql/resolvers-types'

export class TicketPriceDTO {
  props: Partial<Price>

  constructor(props: Partial<Price>) {
    this.props = props
  }

  static async list(ticketId: string) {
    const data = await prisma.price.findMany({
      where: {
        tickets: {
          some: {
            ticketId,
          },
        },
      },
    })
    return data.map((item) => new TicketPriceDTO(item))
  }

  serialize(): TicketPrice {
    return {
      __typename: 'TicketPrice',
      id: this.props.id ?? '',
      price: this.props.price ?? 0,
      priceCurrency: this.props.priceCurrency ?? '',
      title: this.props.title ?? '',
    }
  }
}
