import { PosterDTO } from '@/dtos/poster.dto'

export interface PosterRepository {
  findMany(params: { eventId: string }): Promise<PosterDTO[]>
}
