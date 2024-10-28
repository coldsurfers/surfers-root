import { Resolvers } from '../../gql/resolvers-types'
import TicketDTO from '../dtos/TicketDTO'
import { authorizeUser } from '../utils/authHelpers'

const concertTicketResolvers: Resolvers = {
  Query: {
    concertTickets: async (parent, args, ctx) => {
      await authorizeUser(ctx, { requiredRole: 'staff' })
      const { concertId } = args
      const dtos = await TicketDTO.findTickets(concertId)

      return {
        __typename: 'TicketList',
        list: dtos.map((dto) => dto.serialize()),
      }
    },
  },
  Mutation: {
    createConcertTicket: async (parent, args, ctx) => {
      await authorizeUser(ctx, { requiredRole: 'staff' })
      const { concertId, openDate, seller, sellingURL } = args.input
      const ticketDTO = new TicketDTO({
        openDate: new Date(openDate),
        seller,
        sellingURL,
      })
      const created = await ticketDTO.create({ concertId })

      return created.serialize()
    },
    updateConcertTicket: async (parent, args, ctx) => {
      await authorizeUser(ctx, { requiredRole: 'staff' })
      const { id, openDate, seller, sellingURL } = args.input
      const ticketDTO = new TicketDTO({
        id,
      })
      const updated = await ticketDTO.update({
        openDate: openDate ? new Date(openDate) : undefined,
        seller: seller ?? undefined,
        sellingURL: sellingURL ?? undefined,
      })
      return updated.serialize()
    },
    removeConcertTicket: async (parent, args, ctx) => {
      await authorizeUser(ctx, { requiredRole: 'staff' })
      const { concertId, ticketId } = args.input
      const dto = new TicketDTO({
        id: ticketId,
      })
      const deleted = await dto.delete({ concertId })
      return deleted.serialize()
    },
  },
}

export default concertTicketResolvers
