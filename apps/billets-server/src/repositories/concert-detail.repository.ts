import type { ConcertDetailDTO } from '@/dtos/concert.dto';

export interface ConcertDetailRepository {
  getConcertDetailById(id: string): Promise<ConcertDetailDTO | null>;
  getConcertDetailBySlug(slug: string): Promise<ConcertDetailDTO | null>;
}
