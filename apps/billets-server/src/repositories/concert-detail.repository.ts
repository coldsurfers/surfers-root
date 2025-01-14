import { ConcertDetailDTO } from '@/dtos/concert.dto'

export interface ConcertDetailRepository {
  getConcertDetailById(id: string): Promise<ConcertDetailDTO | null>
}
