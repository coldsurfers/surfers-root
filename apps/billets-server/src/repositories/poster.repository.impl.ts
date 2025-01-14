import { PosterDTO } from '@/dtos/poster.dto'
import { dbClient } from '@/lib/db'
import { Poster } from '@prisma/client'
import { PosterRepository } from './poster.repository'

export class PosterRepositoryImpl implements PosterRepository {
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
      url: model.imageURL,
    }
  }
}
