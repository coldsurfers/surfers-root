import type {
  ConcertDTO,
  FindManyByArtistIdConcertDTO,
  FindManyByVenueIdConcertDTO,
  FindManyConcertDTO,
} from '@/dtos/concert.dto';
import type { ConcertRepository } from '@/repositories/concert.repository';

export class ConcertService {
  private concertRepository: ConcertRepository;

  constructor(concertRepository: ConcertRepository) {
    this.concertRepository = concertRepository;
  }

  getMany(params: FindManyConcertDTO): Promise<ConcertDTO[]> {
    return this.concertRepository.findMany(params);
  }
  getById(id: string): Promise<ConcertDTO | null> {
    return this.concertRepository.findById(id);
  }
  getManyByVenueId(params: FindManyByVenueIdConcertDTO): Promise<ConcertDTO[]> {
    return this.concertRepository.findManyByVenueId(params);
  }
  getManyByArtistId(params: FindManyByArtistIdConcertDTO): Promise<ConcertDTO[]> {
    return this.concertRepository.findManyByArtistId(params);
  }
  getSubscribedConcert(params: { userId: string; concertId: string }): Promise<ConcertDTO | null> {
    return this.concertRepository.findSubscribedConcert(params);
  }
  unsubscribe(params: { userId: string; concertId: string }): Promise<ConcertDTO> {
    return this.concertRepository.unsubscribe(params);
  }
  subscribe(params: { userId: string; concertId: string }): Promise<ConcertDTO> {
    return this.concertRepository.subscribe(params);
  }
}
