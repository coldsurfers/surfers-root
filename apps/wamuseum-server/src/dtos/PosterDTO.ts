import type { Poster } from '@prisma/client';
import type { Poster as PosterResolver } from '../../gql/resolvers-types';
import { prisma } from '../libs/db/db.utils';
import { generateImageApiUrl } from '../utils/image.utils';

type PosterDTOProps = Partial<Poster>;

export default class PosterDTO {
  props: PosterDTOProps;

  constructor(props: PosterDTOProps) {
    this.props = props;
  }

  static async findByConcertId(concertId: string) {
    const posters = await prisma.poster.findMany({
      where: {
        concerts: {
          some: {
            concertId,
          },
        },
      },
    });
    return posters.map((poster) => new PosterDTO(poster));
  }

  async create({ concertId, imageKey }: { concertId: string; imageKey: string }) {
    const poster = await prisma.poster.create({
      data: {
        imageURL: generateImageApiUrl(imageKey),
      },
    });
    const created = await prisma.concertsOnPosters.create({
      data: {
        concertId,
        posterId: poster.id,
      },
      include: {
        poster: true,
      },
    });
    return new PosterDTO({
      id: created.poster.id,
      imageURL: created.poster.imageURL,
    });
  }

  async update(data: { imageKey: string }) {
    const updated = await prisma.poster.update({
      where: {
        id: this.props.id,
      },
      data: {
        imageURL: generateImageApiUrl(data.imageKey),
      },
    });
    return new PosterDTO(updated);
  }

  serialize(): PosterResolver {
    return {
      __typename: 'Poster',
      id: this.props.id ?? '',
      imageURL: this.props.imageURL ?? '',
    };
  }
}
