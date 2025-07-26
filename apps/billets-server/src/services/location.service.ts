import type { LocationCityDTO, LocationConcertDTO, LocationCountryDTO } from '@/dtos/location.dto';
import type { LocationRepository } from '@/repositories/location.repository';

export class LocationService {
  private locationRepository: LocationRepository;

  constructor(locationRepository: LocationRepository) {
    this.locationRepository = locationRepository;
  }

  async findAllCity(): Promise<LocationCityDTO[]> {
    return await this.locationRepository.findAllCity();
  }

  async findAllConcertsByGeohashes(geohashes: string[]): Promise<LocationConcertDTO[]> {
    return await this.locationRepository.findAllConcertsByGeohashes(geohashes);
  }

  async findAllCountry(): Promise<LocationCountryDTO[]> {
    return await this.locationRepository.findAllCountry();
  }
}
