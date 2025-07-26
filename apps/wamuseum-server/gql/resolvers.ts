import { copyrightResolvers, ticketPriceResolvers } from '../src/resolvers';
import artistResolvers from '../src/resolvers/artistResolvers';
import authResolvers from '../src/resolvers/authResolvers';
import concertPosterResolvers from '../src/resolvers/concertPosterResolvers';
import concertResolvers from '../src/resolvers/concertResolvers';
import concertTicketResolvers from '../src/resolvers/concertTicketResolvers';
import userResolvers from '../src/resolvers/userResolvers';
import venueResolvers from '../src/resolvers/venueResolvers';
import type { Resolvers } from './resolvers-types';

const resolvers: Resolvers = {
  Query: {
    ...userResolvers.Query,
    ...concertResolvers.Query,
    ...concertPosterResolvers.Query,
    ...artistResolvers.Query,
    ...concertTicketResolvers.Query,
    ...venueResolvers.Query,
    ...ticketPriceResolvers.Query,
    ...copyrightResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...authResolvers.Mutation,
    ...concertResolvers.Mutation,
    ...concertTicketResolvers.Mutation,
    ...concertPosterResolvers.Mutation,
    ...artistResolvers.Mutation,
    ...venueResolvers.Mutation,
    ...ticketPriceResolvers.Mutation,
    ...copyrightResolvers.Mutation,
  },
};

export default resolvers;
