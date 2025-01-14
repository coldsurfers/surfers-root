import { PosterDetailDTO } from '@/dtos/poster-detail.dto'
import { PosterDTO } from '@/dtos/poster.dto'
import { dbClient } from '@/lib/db'
import { Copyright, Poster } from '@prisma/client'
import { PosterRepository } from './poster.repository'

export class PosterRepositoryImpl implements PosterRepository {
  async findOne(params: { posterId: string }): Promise<PosterDetailDTO | null> {
    const poster = await dbClient.poster.findUnique({
      where: {
        id: params.posterId,
      },
      include: {
        copyright: true,
      },
    })
    if (!poster) {
      return null
    }
    return this.toDetailDTO({
      ...poster,
      copyright: poster.copyright ?? null,
    })
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
    })
    return posters.map((poster) => this.toDTO(poster))
  }

  private toDTO(model: Poster): PosterDTO {
    return {
      id: model.id,
      url: model.imageURL,
    }
  }

  private toDetailDTO(
    model: Poster & {
      copyright: Copyright | null
    },
  ): PosterDetailDTO {
    return {
      id: model.id,
      url: model.imageURL,
      copyright: model.copyright,
    }
  }
}
