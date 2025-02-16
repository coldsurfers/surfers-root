import { ArtistSubscribeDTO, EventSubscribeDTO, VenueSubscribeDTO } from '@/dtos/subscribe.dto'

export interface SubscribeRepository {
  findManyEvents(params: { userId: string; take: number; skip: number }): Promise<EventSubscribeDTO[]>
  findEvent(params: { eventId: string; userId: string }): Promise<EventSubscribeDTO | null>
  subscribeEvent(params: { userId: string; eventId: string }): Promise<EventSubscribeDTO>
  unsubscribeEvent(params: { userId: string; eventId: string }): Promise<EventSubscribeDTO>
  findArtist(params: { userId: string; artistId: string }): Promise<ArtistSubscribeDTO | null>
  subscribeArtist(params: { userId: string; artistId: string }): Promise<ArtistSubscribeDTO>
  unsubscribeArtist(params: { userId: string; artistId: string }): Promise<ArtistSubscribeDTO>
  findVenue(params: { userId: string; venueId: string }): Promise<VenueSubscribeDTO | null>
  subscribeVenue(params: { userId: string; venueId: string }): Promise<VenueSubscribeDTO>
  unsubscribeVenue(params: { userId: string; venueId: string }): Promise<VenueSubscribeDTO>
  count(params: { userId: string }): Promise<{
    event: number
    artist: number
    venue: number
  }>
}
