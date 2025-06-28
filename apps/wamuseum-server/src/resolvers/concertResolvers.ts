import type { Resolvers } from '../../gql/resolvers-types';
import ConcertDTO from '../dtos/ConcertDTO';
import ConcertListPaginationDTO from '../dtos/ConcertListWithPaginationDTO';
import { firebaseAdmin } from '../libs/firebase';
import { authorizeUser } from '../utils/authHelpers';

const concertResolvers: Resolvers = {
  Query: {
    concert: async (_, args, ctx) => {
      await authorizeUser(ctx, { requiredRole: 'staff' });
      const concertDTO = await ConcertDTO.findById(args.id);

      if (!concertDTO)
        return {
          __typename: 'HttpError',
          code: 404,
          message: '콘서트가 존재하지 않습니다.',
        };

      return concertDTO.serialize();
    },
    concertList: async (_, args, ctx) => {
      await authorizeUser(ctx, { requiredRole: 'staff' });
      const { page, limit, orderBy } = args;
      const concertListPaginationDTO = await ConcertListPaginationDTO.list({
        page,
        limit,
        orderBy: {
          createdAt: orderBy.createdAt as 'asc' | 'desc',
        },
      });
      const count = await ConcertListPaginationDTO.count();
      return concertListPaginationDTO.serialize(page, count, limit);
    },
  },
  Mutation: {
    createConcert: async (_, args, ctx) => {
      await authorizeUser(ctx, { requiredRole: 'staff' });
      const { date, title } = args.input;
      const concertDTO = new ConcertDTO({
        title,
        date: new Date(date),
      });
      const concert = await concertDTO.create();

      return concert.serialize();
    },
    updateConcert: async (_, args, ctx) => {
      await authorizeUser(ctx, { requiredRole: 'staff' });
      const { id, date, title } = args.input;
      const concertDTO = new ConcertDTO({
        id,
      });
      const updated = await concertDTO.update({ title, date });
      return updated.serialize();
    },
    removeConcert: async (_, args, ctx) => {
      await authorizeUser(ctx, { requiredRole: 'staff' });
      const existing = await ConcertDTO.findById(args.input.id);
      if (!existing)
        return {
          __typename: 'HttpError',
          code: 404,
          message: '콘서트가 존재하지 않습니다.',
        };
      await existing.delete();
      return existing.serialize();
    },
    notifyConcert: async (_, args, ctx) => {
      await authorizeUser(ctx, { requiredRole: 'staff' });
      const { concertId } = args.input;
      const concert = await ConcertDTO.findById(concertId);
      if (!concert || !concert.id || !concert.title) {
        return {
          __typename: 'HttpError',
          code: 404,
          message: '콘서트가 존재하지 않습니다.',
        };
      }
      // send fcm message from server
      const response = await firebaseAdmin.sendMessageToTopic({
        topic: 'new-concert',
        title: '🎫 최신 공연 소식 🎫',
        body: `${concert.title} 공연이 새로 등록 되었어요. 더 알아보려면 누르세요!`,
        data: {
          type: 'new-concert',
          navigationId: 'concert-detail',
          concertId: concert.id,
        },
      });
      return {
        __typename: 'RemoteNotification',
        response,
      };
    },
  },
};

export default concertResolvers;
