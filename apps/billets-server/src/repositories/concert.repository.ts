import type {
  ConcertDTO,
  FindManyByArtistIdConcertDTO,
  FindManyByVenueIdConcertDTO,
  FindManyConcertDTO,
  SubscribeUnsubscribeConcertDTO,
} from '@/dtos/concert.dto';

export interface ConcertRepository {
  findById(id: string): Promise<ConcertDTO | null>;
  findMany(params: FindManyConcertDTO): Promise<ConcertDTO[]>;
  findManyByVenueId(params: FindManyByVenueIdConcertDTO): Promise<ConcertDTO[]>;
  findManyByArtistId(params: FindManyByArtistIdConcertDTO): Promise<ConcertDTO[]>;
  subscribe(params: SubscribeUnsubscribeConcertDTO): Promise<ConcertDTO>;
  unsubscribe(params: SubscribeUnsubscribeConcertDTO): Promise<ConcertDTO>;
  findSubscribedConcert(params: { userId: string; concertId: string }): Promise<ConcertDTO | null>;
}
