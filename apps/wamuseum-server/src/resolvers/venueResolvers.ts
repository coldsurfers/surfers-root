import ngeohash from 'ngeohash';
import type { Resolvers } from '../../gql/resolvers-types';
import SearchVenueDTO from '../dtos/SearchVenueDTO';
import VenueDTO from '../dtos/VenueDTO';
import { authorizeUser } from '../utils/authHelpers';

const venueResolvers: Resolvers = {
  Query: {
    searchVenue: async (_, args, ctx) => {
      await authorizeUser(ctx, { requiredRole: 'staff' });
      const { keyword } = args;
      try {
        const dtos = await SearchVenueDTO.search(keyword);
        return {
          __typename: 'SearchedVenueList',
          list: dtos.map((dto) => dto.serialize()),
        };
      } catch (e) {
        return {
          __typename: 'HttpError',
          code: 500,
          message: (e as Error).toString(),
        };
      }
    },
    searchConcertVenue: async (_, args, ctx) => {
      try {
        await authorizeUser(ctx, { requiredRole: 'staff' });
        const { keyword } = args;
        const dtos = await VenueDTO.search(keyword);
        return {
          __typename: 'SearchedConcertVenueList',
          list: dtos.map((dto) => dto.serialize()),
        };
      } catch (e) {
        return {
          __typename: 'HttpError',
          code: 500,
          message: (e as Error).toString(),
        };
      }
    },
    concertVenues: async (_, args, ctx) => {
      try {
        await authorizeUser(ctx, { requiredRole: 'staff' });
        const dtos = await VenueDTO.find(args.concertId);
        return {
          __typename: 'ConcertVenueList',
          list: dtos.map((dto) => dto.serialize()),
        };
      } catch (e) {
        return {
          __typename: 'HttpError',
          code: 500,
          message: (e as Error).toString(),
        };
      }
    },
  },
  Mutation: {
    createVenue: async (_, args, ctx) => {
      await authorizeUser(ctx, { requiredRole: 'staff' });
      const { lat, lng, name, address } = args.input;
      const dto = new VenueDTO({
        lat,
        lng,
        name,
        geohash: ngeohash.encode(lat, lng, 12),
        address,
      });
      const created = await dto.create();
      return created.serialize();
    },
    createConcertVenue: async (_, args, ctx) => {
      await authorizeUser(ctx, { requiredRole: 'staff' });
      const venueDTO = new VenueDTO({
        id: args.input.venueId,
      });
      const connected = await venueDTO.connect(args.input.concertId);
      return connected.serialize();
    },
    removeConcertVenue: async (_, args, ctx) => {
      try {
        await authorizeUser(ctx, { requiredRole: 'staff' });
        const dto = new VenueDTO({
          id: args.input.venueId,
        });
        const removed = await dto.delete(args.input.concertId);
        return removed.serialize();
      } catch (e) {
        return {
          __typename: 'HttpError',
          code: 500,
          message: (e as Error).toString(),
        };
      }
    },
  },
};

export default venueResolvers;
