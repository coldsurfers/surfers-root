import { dbClient } from '@/lib/db'
import { LocationCountry } from '@prisma/client'
import { locationCountryDTOSerializedSchema } from './location-country-dto.types'

export class LocationCountryDTO {
  constructor(
    private props: Partial<
      LocationCountry & {
        cities: {
          id: string
          name: string
          uiName: string
          lat: number
          lng: number
        }[]
      }
    >,
  ) {}

  public static async listCountry() {
    const data = await dbClient.locationCountry.findMany({
      include: {
        locationCities: {
          include: {
            locationCity: true,
          },
        },
      },
    })
    return data.map(
      (value) =>
        new LocationCountryDTO({
          ...value,
          cities: value.locationCities.map((locationCity) => ({
            id: locationCity.locationCity.id,
            name: locationCity.locationCity.name,
            uiName: locationCity.locationCity.uiName,
            lat: locationCity.locationCity.lat,
            lng: locationCity.locationCity.lng,
          })),
        }),
    )
  }

  serialize() {
    const validation = locationCountryDTOSerializedSchema.safeParse({
      id: this.props.id,
      name: this.props.name,
      uiName: this.props.uiName,
      cities: this.props.cities,
    })
    if (!validation.success) {
      throw validation.error
    }
    const { data } = validation
    return {
      id: data.id,
      name: data.name,
      uiName: data.uiName,
      cities: data.cities,
    }
  }
}
