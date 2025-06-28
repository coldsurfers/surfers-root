import type { ConcertListWithPagination } from '../../gql/resolvers-types';
import { prisma } from '../libs/db/db.utils';
import ConcertDTO from './ConcertDTO';

export default class ConcertListWithPaginationDTO {
  list: ConcertDTO[];

  constructor(list: ConcertDTO[]) {
    this.list = list;
  }

  static async list({
    page,
    limit,
    orderBy,
  }: {
    page: number;
    limit: number;
    orderBy: {
      createdAt: 'asc' | 'desc';
    };
  }) {
    const data = await prisma.concert.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy,
      where: {
        deletedAt: null,
      },
    });
    return new ConcertListWithPaginationDTO(data.map((item) => new ConcertDTO(item)));
  }

  static async count() {
    const count = await prisma.concert.count();
    return count;
  }

  serialize(page: number, count: number, limit: number): ConcertListWithPagination {
    return {
      __typename: 'ConcertListWithPagination',
      list: {
        __typename: 'ConcertList',
        list: this.list.map((item) => item.serialize()),
      },
      pagination: {
        __typename: 'Pagination',
        current: page,
        count: Math.ceil(count / limit),
      },
    };
  }
}
