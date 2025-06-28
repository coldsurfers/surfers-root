import type { PosterDetailDTO } from '@/dtos/poster-detail.dto';
import type { PosterDTO } from '@/dtos/poster.dto';
import { dbClient } from '@/lib/db';
import type { Copyright, Poster } from '@prisma/client';
import dotenv from 'dotenv';
import type { PosterRepository } from './poster.repository';

dotenv.config();

const { STATIC_SERVER_HOST: staticServerHost } = process.env;

export class PosterRepositoryImpl implements PosterRepository {
  async findOne(params: { posterId: string }): Promise<PosterDetailDTO | null> {
    const poster = await dbClient.poster.findUnique({
      where: {
        id: params.posterId,
      },
      include: {
        copyright: true,
      },
    });
    if (!poster) {
      return null;
    }
    return this.toDetailDTO({
      ...poster,
      copyright: poster.copyright ?? null,
    });
  }
  async findMany(params: { eventId: string }): Promise<PosterDTO[]> {
    const posters = await dbClient.poster.findMany({
      where: {
        concerts: {
          some: {
            concertId: params.eventId,
          },
        },
      },
    });
    return posters.map((poster) => this.toDTO(poster));
  }

  private toDTO(model: Poster): PosterDTO {
    return {
      id: model.id,
      url: `${staticServerHost}/${model.keyId}`,
    };
  }

  private toDetailDTO(
    model: Poster & {
      copyright: Copyright | null;
    }
  ): PosterDetailDTO {
    return {
      id: model.id,
      url: `${staticServerHost}/${model.keyId}`,
      copyright: model.copyright,
    };
  }
}
