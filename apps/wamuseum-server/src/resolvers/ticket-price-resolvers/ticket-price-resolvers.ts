import type { Resolvers } from '../../../gql/resolvers-types';
import { TicketPriceDTO } from '../../dtos';
import { authorizeUser } from '../../utils/authHelpers';

export const ticketPriceResolvers: Resolvers = {
  Query: {
    concertTicketPrices: async (_, args, ctx) => {
      try {
        await authorizeUser(ctx, { requiredRole: 'staff' });
        const dtos = await TicketPriceDTO.list(args.ticketId);
        return {
          __typename: 'TicketPriceList',
          list: dtos.map((dto) => dto.serialize()),
        };
      } catch (e) {
        console.error(e);
        return {
          __typename: 'HttpError',
          code: 500,
          message: 'internal server error',
        };
      }
    },
  },
  Mutation: {
    createConcertTicketPrice: async (_, args, ctx) => {
      try {
        await authorizeUser(ctx, { requiredRole: 'staff' });
        const { title, price, priceCurrency, ticketId } = args.input;
        const dto = new TicketPriceDTO({
          title,
          price,
          priceCurrency,
        });
        const created = await dto.create({ ticketId });
        return {
          __typename: 'TicketPrice',
          ...created.serialize(),
        };
      } catch (e) {
        console.error(e);
        return {
          __typename: 'HttpError',
          code: 500,
          message: 'internal server error',
        };
      }
    },
    removeConcertTicketPrice: async (_, args, ctx) => {
      try {
        await authorizeUser(ctx, { requiredRole: 'staff' });
        const { ticketPriceId } = args.input;
        const dto = new TicketPriceDTO({
          id: ticketPriceId,
        });
        const deleted = await dto.delete();
        return {
          __typename: 'TicketPrice',
          ...deleted.serialize(),
        };
      } catch (e) {
        console.error(e);
        return {
          __typename: 'HttpError',
          code: 500,
          message: 'internal server error',
        };
      }
    },
  },
};
