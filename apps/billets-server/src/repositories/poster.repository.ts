import { PosterDetailDTO } from '@/dtos/poster-detail.dto'
import { PosterDTO } from '@/dtos/poster.dto'

export interface PosterRepository {
  findMany(params: { eventId: string }): Promise<PosterDTO[]>
  findOne(params: { posterId: string }): Promise<PosterDetailDTO | null>
}
