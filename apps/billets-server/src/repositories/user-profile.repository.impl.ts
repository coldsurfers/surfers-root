import type { UserProfileDTO } from '@/dtos/user-profile.dto';
import type { UserHandleDTO } from '@/dtos/user.dto';
import { dbClient } from '@/lib/db';
import type { Concert, Copyright, Poster, Venue } from '@prisma/client';
import type { UserProfileRepository } from './user-profile.repository';

type UserProfileModel = {
  handle: UserHandleDTO;
  subscribedConcerts: (Concert & {
    posters: (Poster & {
      copyright: Copyright | null;
    })[];
    venues: Venue[];
  })[];
};

export class UserProfileRepositoryImpl implements UserProfileRepository {
  async getUserProfileByHandle(handle: string): Promise<UserProfileDTO | null> {
    const user = await dbClient.user.findUnique({
      where: {
        handle,
      },
      include: {
        subscribedConcerts: {
          include: {
            concert: {
              include: {
                posters: {
                  include: {
                    poster: {
                      include: {
                        copyright: true,
                      },
                    },
                  },
                },
                venues: {
                  include: {
                    venue: true,
                  },
                },
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
    return user?.handle
      ? this.toDTO({
          handle: user.handle,
          subscribedConcerts: user.subscribedConcerts
            .map((concert) => concert.concert)
            .map((concert) => {
              return {
                ...concert,
                posters: concert.posters.map((poster) => poster.poster),
                venues: concert.venues.map((venue) => venue.venue),
              };
            }),
        })
      : null;
  }

  private toDTO(userProfile: UserProfileModel): UserProfileDTO {
    return {
      handle: `@${userProfile.handle}`,
      subscribedEvents: userProfile.subscribedConcerts.map((concert) => {
        const firstPoster = concert.posters.at(0);
        const firstVenue = concert.venues.at(0);
        return {
          type: 'concert',
          data: {
            id: concert.id,
            title: concert.title,
            date: concert.date.toISOString(),
            slug: concert.slug,
            mainPoster: firstPoster?.imageURL
              ? {
                  url: firstPoster.imageURL,
                  copyright: firstPoster.copyright,
                }
              : null,
            mainVenue: firstVenue
              ? {
                  name: firstVenue.name,
                }
              : null,
          },
        };
      }),
    };
  }
}
