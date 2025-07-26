import type { Concert } from '@prisma/client';
import { GraphQLError } from 'graphql';
import type { Concert as ConcertResolverType } from '../../gql/resolvers-types';
import { prisma } from '../libs/db/db.utils';

export default class ConcertDTO {
  props: Partial<Concert>;

  constructor(props: Partial<Concert>) {
    this.props = props;
  }

  static async findById(id: string) {
    const concert = await prisma.concert.findUnique({
      where: {
        id,
      },
    });
    if (!concert) return null;
    return new ConcertDTO(concert);
  }

  async create() {
    const { title, date } = this.props;
    if (!title || !date) {
      throw new GraphQLError('invalid title or date');
    }
    const created = await prisma.concert.create({
      data: {
        title,
        date,
      },
    });
    return new ConcertDTO(created);
  }

  async update({ title, date }: { title: string; date: string }) {
    const data = await prisma.concert.update({
      where: {
        id: this.props.id,
      },
      data: {
        title,
        date,
      },
    });
    return new ConcertDTO(data);
  }

  async delete() {
    await prisma.concert.update({
      where: {
        id: this.props.id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  get id() {
    return this.props.id;
  }

  get title() {
    return this.props.title;
  }

  serialize(): ConcertResolverType {
    return {
      __typename: 'Concert',
      createdAt: this.props.createdAt?.toISOString() ?? '',
      date: this.props.date?.toISOString() ?? '',
      id: this.props.id ?? '',
      title: this.props.title ?? '',
      updatedAt: this.props.updatedAt?.toISOString() ?? '',
    };
  }
}
