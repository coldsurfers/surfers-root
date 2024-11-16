import { Resolvers } from '../../../gql/resolvers-types'
import { TicketPriceDTO } from '../../dtos'
import { authorizeUser } from '../../utils/authHelpers'

export const ticketPriceResolvers: Resolvers = {
  Query: {
    concertTicketPrices: async (parent, args, ctx) => {
      try {
        await authorizeUser(ctx, { requiredRole: 'staff' })
        const dtos = await TicketPriceDTO.list(args.ticketId)
        return {
          __typename: 'TicketPriceList',
          list: dtos.map((dto) => dto.serialize()),
        }
      } catch (e) {
        return {
          __typename: 'HttpError',
          code: 500,
          message: 'internal server error',
        }
      }
    },
  },
  Mutation: {},
}
