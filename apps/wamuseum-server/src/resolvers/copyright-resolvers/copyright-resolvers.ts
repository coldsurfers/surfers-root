import type { Resolvers } from '../../../gql/resolvers-types';
import { CopyrightDTO } from '../../dtos';
import { authorizeUser } from '../../utils/authHelpers';

export const copyrightResolvers: Resolvers = {
  Mutation: {
    createCopyright: async (_, args, ctx) => {
      try {
        await authorizeUser(ctx, { requiredRole: 'staff' });
        const { license, owner, artistProfileImageId, licenseURL } = args.input;
        const dto = new CopyrightDTO({
          license,
          owner,
          licenseURL,
        });
        const created = await dto.create({
          artistProfileImageId: artistProfileImageId ?? undefined,
        });
        return {
          __typename: 'Copyright',
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
  },
};
