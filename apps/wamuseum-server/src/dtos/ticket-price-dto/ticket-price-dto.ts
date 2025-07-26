import type { Price } from '@prisma/client';
import type { TicketPrice } from '../../../gql/resolvers-types';
import { prisma } from '../../libs/db/db.utils';

export class TicketPriceDTO {
  props: Partial<Price>;

  constructor(props: Partial<Price>) {
    this.props = props;
  }

  async create({ ticketId }: { ticketId: string }) {
    if (!this.props.price || !this.props.priceCurrency || !this.props.title) {
      throw Error('invalid price, priceCurrency, title');
    }
    const price = await prisma.price.create({
      data: {
        price: this.props.price,
        priceCurrency: this.props.priceCurrency,
        title: this.props.title,
      },
    });
    await prisma.ticketsOnPrices.create({
      data: {
        priceId: price.id,
        ticketId,
      },
    });

    return new TicketPriceDTO(price);
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
    });
    return data.map((item) => new TicketPriceDTO(item));
  }

  async delete() {
    if (!this.props.id) {
      throw Error('invalid id');
    }
    const existing = await prisma.price.findUnique({
      where: {
        id: this.props.id,
      },
      include: {
        tickets: {
          select: { ticketId: true },
        },
      },
    });
    if (!existing) {
      throw Error('ticket price is not existing');
    }
    await prisma.ticketsOnPrices.deleteMany({
      where: {
        AND: [
          {
            ticketId: {
              in: existing?.tickets.map((ticket) => ticket.ticketId),
            },
          },
          {
            priceId: existing.id,
          },
        ],
      },
    });
    const data = await prisma.price.delete({
      where: {
        id: this.props.id,
      },
    });
    return new TicketPriceDTO(data);
  }

  serialize(): TicketPrice {
    return {
      __typename: 'TicketPrice',
      id: this.props.id ?? '',
      price: this.props.price ?? 0,
      priceCurrency: this.props.priceCurrency ?? '',
      title: this.props.title ?? '',
    };
  }
}
