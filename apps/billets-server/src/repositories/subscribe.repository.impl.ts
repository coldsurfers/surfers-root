import type {
  ArtistSubscribeDTO,
  EventSubscribeDTO,
  VenueSubscribeDTO,
} from '@/dtos/subscribe.dto';
import { dbClient } from '@/lib/db';
import type {
  UsersOnSubscribedArtists,
  UsersOnSubscribedConcerts,
  UsersOnSubscribedVenues,
} from '@prisma/client';
import dotenv from 'dotenv';
import type { SubscribeRepository } from './subscribe.repository';

dotenv.config();

const { STATIC_SERVER_HOST: staticServerHost } = process.env;

export class SubscribeRepositoryImpl implements SubscribeRepository {
  async count(params: { userId: string }): Promise<{
    event: number;
    artist: number;
    venue: number;
  }> {
    const eventCount = await dbClient.usersOnSubscribedConcerts.count({
      where: {
        userId: params.userId,
      },
    });
    const artistCount = await dbClient.usersOnSubscribedArtists.count({
      where: {
        userId: params.userId,
      },
    });
    const venueCount = await dbClient.usersOnSubscribedVenues.count({
      where: {
        userId: params.userId,
      },
    });
    return {
      event: eventCount,
      artist: artistCount,
      venue: venueCount,
    };
  }
  async findLatestSubscriptions(params: {
    userId: string;
  }): Promise<{
    event: EventSubscribeDTO | null;
    artist: ArtistSubscribeDTO | null;
    venue: VenueSubscribeDTO | null;
  }> {
    const eventData = await dbClient.usersOnSubscribedConcerts.findFirst({
      where: {
        userId: params.userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        concert: {
          include: {
            posters: {
              include: {
                poster: true,
              },
            },
          },
        },
      },
    });
    const artistData = await dbClient.usersOnSubscribedArtists.findFirst({
      where: {
        userId: params.userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        artist: {
          include: {
            artistProfileImage: true,
          },
        },
      },
    });
    const venueData = await dbClient.usersOnSubscribedVenues.findFirst({
      where: {
        userId: params.userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    const posterKeyId = eventData?.concert.posters.at(0)?.poster.keyId;
    return {
      event: eventData
        ? this.toDTO({
            ...eventData,
            thumbUrl: `${staticServerHost}/${posterKeyId}`,
          })
        : null,
      artist: artistData
        ? this.toArtistSubscribeDTO({
            ...artistData,
            thumbUrl: artistData.artist.artistProfileImage.at(0)?.imageURL,
          })
        : null,
      venue: venueData
        ? this.toVenueSubscribeDTO({
            ...venueData,
            thumbUrl: undefined,
          })
        : null,
    };
  }
  async findManyEvents(params: { userId: string; take: number; skip: number }): Promise<
    EventSubscribeDTO[]
  > {
    const data = await dbClient.usersOnSubscribedConcerts.findMany({
      where: {
        userId: params.userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: params.take,
      skip: params.skip,
    });

    return data.map(this.toDTO);
  }

  async findManyArtists(params: { userId: string; take: number; skip: number }): Promise<
    ArtistSubscribeDTO[]
  > {
    const data = await dbClient.usersOnSubscribedArtists.findMany({
      where: {
        userId: params.userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: params.take,
      skip: params.skip,
    });
    return data.map(this.toArtistSubscribeDTO);
  }

  async findManyVenues(params: { userId: string; take: number; skip: number }): Promise<
    VenueSubscribeDTO[]
  > {
    const data = await dbClient.usersOnSubscribedVenues.findMany({
      where: {
        userId: params.userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: params.take,
      skip: params.skip,
    });
    return data.map(this.toVenueSubscribeDTO);
  }

  async findEvent(params: { eventId: string; userId: string }): Promise<EventSubscribeDTO | null> {
    const data = await dbClient.usersOnSubscribedConcerts.findUnique({
      where: {
        userId_concertId: {
          userId: params.userId,
          concertId: params.eventId,
        },
      },
    });
    if (!data) {
      return null;
    }
    return this.toDTO(data);
  }

  async subscribeEvent(params: { userId: string; eventId: string }): Promise<EventSubscribeDTO> {
    const data = await dbClient.usersOnSubscribedConcerts.create({
      data: {
        userId: params.userId,
        concertId: params.eventId,
      },
    });
    return this.toDTO(data);
  }

  async unsubscribeEvent(params: { userId: string; eventId: string }): Promise<EventSubscribeDTO> {
    const data = await dbClient.usersOnSubscribedConcerts.delete({
      where: {
        userId_concertId: {
          userId: params.userId,
          concertId: params.eventId,
        },
      },
    });
    return this.toDTO(data);
  }

  async findArtist(params: {
    userId: string;
    artistId: string;
  }): Promise<ArtistSubscribeDTO | null> {
    const data = await dbClient.usersOnSubscribedArtists.findUnique({
      where: {
        userId_artistId: {
          userId: params.userId,
          artistId: params.artistId,
        },
      },
    });
    if (!data) {
      return null;
    }
    return this.toArtistSubscribeDTO(data);
  }

  async subscribeArtist(params: { userId: string; artistId: string }): Promise<ArtistSubscribeDTO> {
    const data = await dbClient.usersOnSubscribedArtists.create({
      data: {
        userId: params.userId,
        artistId: params.artistId,
      },
    });
    return this.toArtistSubscribeDTO(data);
  }

  async unsubscribeArtist(params: {
    userId: string;
    artistId: string;
  }): Promise<ArtistSubscribeDTO> {
    const data = await dbClient.usersOnSubscribedArtists.delete({
      where: {
        userId_artistId: {
          userId: params.userId,
          artistId: params.artistId,
        },
      },
    });
    return this.toArtistSubscribeDTO(data);
  }

  async findVenue(params: { userId: string; venueId: string }): Promise<VenueSubscribeDTO | null> {
    const data = await dbClient.usersOnSubscribedVenues.findUnique({
      where: {
        userId_venueId: {
          userId: params.userId,
          venueId: params.venueId,
        },
      },
    });
    if (!data) {
      return null;
    }
    return this.toVenueSubscribeDTO(data);
  }

  async subscribeVenue(params: { userId: string; venueId: string }): Promise<VenueSubscribeDTO> {
    const data = await dbClient.usersOnSubscribedVenues.create({
      data: {
        userId: params.userId,
        venueId: params.venueId,
      },
    });
    return this.toVenueSubscribeDTO(data);
  }

  async unsubscribeVenue(params: { userId: string; venueId: string }): Promise<VenueSubscribeDTO> {
    const data = await dbClient.usersOnSubscribedVenues.delete({
      where: {
        userId_venueId: {
          userId: params.userId,
          venueId: params.venueId,
        },
      },
    });
    return this.toVenueSubscribeDTO(data);
  }

  private toDTO(
    data: UsersOnSubscribedConcerts & {
      thumbUrl?: string;
    }
  ): EventSubscribeDTO {
    return {
      eventId: data.concertId,
      userId: data.userId,
      subscribedAt: data.createdAt.toISOString(),
      thumbUrl: data.thumbUrl,
    };
  }

  private toArtistSubscribeDTO(
    data: UsersOnSubscribedArtists & {
      thumbUrl?: string;
    }
  ): ArtistSubscribeDTO {
    return {
      userId: data.userId,
      artistId: data.artistId,
      subscribedAt: data.createdAt.toISOString(),
      thumbUrl: data.thumbUrl,
    };
  }

  private toVenueSubscribeDTO(
    data: UsersOnSubscribedVenues & {
      thumbUrl?: string;
    }
  ): VenueSubscribeDTO {
    return {
      userId: data.userId,
      venueId: data.venueId,
      subscribedAt: data.createdAt.toISOString(),
      thumbUrl: data.thumbUrl,
    };
  }
}
