import type {
  ArtistSubscribeDTO,
  EventSubscribeDTO,
  SubscribeInfoMeDTO,
  VenueSubscribeDTO,
} from '@/dtos/subscribe.dto';
import type { SubscribeRepository } from '@/repositories/subscribe.repository';

export class SubscribeService {
  constructor(private readonly subscribeRepository: SubscribeRepository) {}

  async getSubscribeInfoMe(params: { userId: string }): Promise<SubscribeInfoMeDTO> {
    const countResult = await this.subscribeRepository.count(params);
    const latestResult = await this.subscribeRepository.findLatestSubscriptions(params);
    return {
      artists: {
        count: countResult.artist,
        thumbUrl: latestResult.artist?.thumbUrl ?? null,
      },
      events: {
        count: countResult.event,
        thumbUrl: latestResult.event?.thumbUrl ?? null,
      },
      venues: {
        count: countResult.venue,
        thumbUrl: latestResult.venue?.thumbUrl ?? null,
      },
    };
  }
  async getSubscribedEvents(params: { userId: string; take: number; skip: number }): Promise<
    EventSubscribeDTO[]
  > {
    return this.subscribeRepository.findManyEvents(params);
  }
  async getSubscribedArtists(params: { userId: string; take: number; skip: number }): Promise<
    ArtistSubscribeDTO[]
  > {
    return this.subscribeRepository.findManyArtists(params);
  }
  async getSubscribedVenues(params: { userId: string; take: number; skip: number }): Promise<
    VenueSubscribeDTO[]
  > {
    return this.subscribeRepository.findManyVenues(params);
  }
  async getSubscribedEvent(params: {
    eventId: string;
    userId: string;
  }): Promise<EventSubscribeDTO | null> {
    return this.subscribeRepository.findEvent(params);
  }
  async subscribeEvent(params: { userId: string; eventId: string }): Promise<EventSubscribeDTO> {
    return this.subscribeRepository.subscribeEvent(params);
  }
  async unsubscribeEvent(params: { userId: string; eventId: string }): Promise<EventSubscribeDTO> {
    return this.subscribeRepository.unsubscribeEvent(params);
  }
  async getSubscribedArtist(params: {
    userId: string;
    artistId: string;
  }): Promise<ArtistSubscribeDTO | null> {
    return this.subscribeRepository.findArtist(params);
  }
  async subscribeArtist(params: { userId: string; artistId: string }): Promise<ArtistSubscribeDTO> {
    return this.subscribeRepository.subscribeArtist(params);
  }
  async unsubscribeArtist(params: {
    userId: string;
    artistId: string;
  }): Promise<ArtistSubscribeDTO> {
    return this.subscribeRepository.unsubscribeArtist(params);
  }
  async getSubscribedVenue(params: {
    userId: string;
    venueId: string;
  }): Promise<VenueSubscribeDTO | null> {
    return this.subscribeRepository.findVenue(params);
  }
  async subscribeVenue(params: { userId: string; venueId: string }): Promise<VenueSubscribeDTO> {
    return this.subscribeRepository.subscribeVenue(params);
  }
  async unsubscribeVenue(params: { userId: string; venueId: string }): Promise<VenueSubscribeDTO> {
    return this.subscribeRepository.unsubscribeVenue(params);
  }
}
