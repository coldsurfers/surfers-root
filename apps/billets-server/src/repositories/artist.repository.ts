import { ArtistDTO } from '@/dtos/artist.dto'

export interface ArtistRepository {
  findById(id: string): Promise<ArtistDTO | null>
  findManyByConcertId(concertId: string): Promise<ArtistDTO[]>
  findSubscribedArtist(params: { artistId: string; userId: string }): Promise<ArtistDTO | null>
  subscribe(params: { userId: string; artistId: string }): Promise<ArtistDTO>
  unsubscribe(params: { userId: string; artistId: string }): Promise<ArtistDTO>
}
