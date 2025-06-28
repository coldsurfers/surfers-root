import type { LocationCityDTO, LocationConcertDTO, LocationCountryDTO } from '@/dtos/location.dto';
import { dbClient } from '@/lib/db/db.client';
import type { Concert, LocationCity, LocationCountry } from '@prisma/client';
import type { LocationRepository } from './location.repository';

export class LocationRepositoryImpl implements LocationRepository {
  async findAllCity(): Promise<LocationCityDTO[]> {
    const data = await dbClient.locationCity.findMany({
      where: {
        disabled: false,
      },
    });
    return data.map((value) => this.toLocationCityDTO(value));
  }
  async findAllConcertsByGeohashes(geohashes: string[]): Promise<LocationConcertDTO[]> {
    const data = await dbClient.concert.findMany({
      where: {
        venues: {
          some: {
            venue: {
              OR: geohashes.map((geohash) => ({
                geohash: {
                  startsWith: geohash,
                },
              })),
            },
          },
        },
        date: {
          gte: new Date(),
        },
        deletedAt: {
          equals: null,
        },
      },
      orderBy: {
        date: 'asc',
      },
      include: {
        venues: {
          select: {
            venue: {
              select: {
                lat: true,
                lng: true,
              },
            },
          },
        },
      },
    });
    return data.map((item) =>
      this.toLocationConcertDTO({
        ...item,
        latitude: item.venues[0].venue.lat,
        longitude: item.venues[0].venue.lng,
      })
    );
  }

  async findAllCountry(): Promise<LocationCountryDTO[]> {
    const data = await dbClient.locationCountry.findMany({
      include: {
        locationCities: {
          where: {
            locationCity: {
              disabled: false,
            },
          },
          include: {
            locationCity: true,
          },
        },
      },
    });
    return data.map((value) =>
      this.toLocationCountryDTO({
        ...value,
        locationCities: value.locationCities.map((locationCity) => locationCity.locationCity),
      })
    );
  }

  private toLocationCityDTO(data: LocationCity): LocationCityDTO {
    return {
      id: data.id,
      name: data.name,
      geohash: data.geohash,
      lat: data.lat,
      lng: data.lng,
      uiName: data.uiName,
    };
  }

  private toLocationConcertDTO(
    data: Concert & {
      latitude: number;
      longitude: number;
    }
  ): LocationConcertDTO {
    return {
      id: data.id,
      title: data.title,
      latitude: data.latitude,
      longitude: data.longitude,
    };
  }

  private toLocationCountryDTO(
    data: LocationCountry & {
      locationCities: LocationCity[];
    }
  ): LocationCountryDTO {
    return {
      id: data.id,
      name: data.name,
      uiName: data.uiName,
      cities: data.locationCities,
    };
  }
}
