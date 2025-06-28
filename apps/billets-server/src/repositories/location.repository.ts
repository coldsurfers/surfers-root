import type { LocationCityDTO, LocationConcertDTO, LocationCountryDTO } from '@/dtos/location.dto';

export interface LocationRepository {
  findAllCity: () => Promise<LocationCityDTO[]>;
  findAllConcertsByGeohashes: (geohashes: string[]) => Promise<LocationConcertDTO[]>;
  findAllCountry: () => Promise<LocationCountryDTO[]>;
}
