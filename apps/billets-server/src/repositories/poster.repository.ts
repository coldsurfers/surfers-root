import { PosterDTO } from '@/dtos/poster.dto'

export interface PosterRepository {
  getPostersByConcertId(concertId: string): Promise<PosterDTO[]>
}
