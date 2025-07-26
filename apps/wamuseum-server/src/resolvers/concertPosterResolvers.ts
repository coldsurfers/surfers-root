import { GraphQLError } from 'graphql';
import type { Resolvers } from '../../gql/resolvers-types';
import PosterDTO from '../dtos/PosterDTO';
import { authorizeUser } from '../utils/authHelpers';

const concertPosterResolvers: Resolvers = {
  Query: {
    concertPoster: async (_, args) => {
      const { concertId } = args;
      const dtos = await PosterDTO.findByConcertId(concertId);

      return {
        __typename: 'PosterList',
        list: dtos.map((dto) => dto.serialize()),
      };
    },
  },
  Mutation: {
    createConcertPoster: async (_, args, ctx) => {
      await authorizeUser(ctx, { requiredRole: 'staff' });
      const { concertId, key } = args.input;
      const posterDTO = new PosterDTO({});
      const poster = await posterDTO.create({
        concertId,
        imageKey: key,
      });
      if (!poster) {
        return {
          __typename: 'HttpError',
          code: 500,
          message: 'Internal Server Error',
        };
      }
      return poster.serialize();
    },
    updateConcertPoster: async (_, args, ctx) => {
      await authorizeUser(ctx, { requiredRole: 'staff' });
      const { id, key } = args.input;
      if (!key) {
        throw new GraphQLError('invalid image key', {
          extensions: {
            code: 400,
          },
        });
      }
      const posterDTO = new PosterDTO({
        id,
      });
      const updated = await posterDTO.update({ imageKey: key });
      return updated.serialize();
    },
  },
};

export default concertPosterResolvers;
