import type { Resolvers } from '../../gql/resolvers-types';
import { ArtistProfileImageDTO } from '../dtos';
import ArtistDTO from '../dtos/ArtistDTO';
import { authorizeUser } from '../utils/authHelpers';

const artistResolvers: Resolvers = {
  Query: {
    searchArtists: async (_, args, ctx) => {
      await authorizeUser(ctx, { requiredRole: 'staff' });
      const dtos = await ArtistDTO.searchByKeyword(args.keyword);

      return {
        __typename: 'ArtistList',
        list: dtos.map((dto) => dto.serialize()),
      };
    },
    concertArtists: async (_, args, ctx) => {
      await authorizeUser(ctx, { requiredRole: 'staff' });
      const dtos = await ArtistDTO.findListByConcertId(args.concertId);
      return {
        __typename: 'ArtistList',
        list: dtos.map((dto) => dto.serialize()),
      };
    },
  },
  Mutation: {
    createArtist: async (_, args, ctx) => {
      await authorizeUser(ctx, { requiredRole: 'staff' });
      const artistDTO = new ArtistDTO({
        name: args.input.artistName,
      });
      const createdArtist = await artistDTO.create();
      if (!createdArtist.id) {
        return {
          __typename: 'HttpError',
          code: 404,
          message: 'not found artist dto id',
        };
      }
      const profileImageDTO = new ArtistProfileImageDTO({
        artistId: createdArtist.id,
      });
      const createdProfileImage = await profileImageDTO.create({ imageKey: args.input.key });

      return {
        __typename: 'ArtistWithProfileImage',
        artist: {
          __typename: 'Artist',
          ...createdArtist.serialize(),
        },
        artistProfileImage: {
          __typename: 'ArtistProfileImage',
          ...createdProfileImage.serialize(),
        },
      };
    },
    createConcertArtist: async (_, args, ctx) => {
      await authorizeUser(ctx, { requiredRole: 'staff' });
      const { concertId, artistId } = args.input;
      const dto = new ArtistDTO({
        id: artistId,
      });
      const connected = await dto.connect(concertId);
      return connected.serialize();
    },
    removeConcertArtist: async (_, args, ctx) => {
      await authorizeUser(ctx, { requiredRole: 'staff' });
      const { concertId, artistId } = args.input;
      const dto = new ArtistDTO({
        id: artistId,
      });
      const removed = await dto.removeFromConcert({ concertId });
      return removed.serialize();
    },
  },
};

export default artistResolvers;
