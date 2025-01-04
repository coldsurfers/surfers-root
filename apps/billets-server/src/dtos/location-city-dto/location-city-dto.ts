import { LocationCity } from '@prisma/client'
import { prisma } from '../../prisma/connect'
import { locationCityDTOSerializedSchema } from './location-city-dto.types'

export class LocationCityDTO {
  constructor(private props: Partial<LocationCity>) {}

  public static async listCity() {
    const data = await prisma.locationCity.findMany({})
    return data.map((value) => new LocationCityDTO(value))
  }

  serialize() {
    const validation = locationCityDTOSerializedSchema.safeParse({
      id: this.props.id,
      name: this.props.name,
      uiName: this.props.uiName,
      lat: this.props.lat,
      lng: this.props.lng,
      geohash: this.props.geohash,
    })
    if (!validation.success) {
      throw validation.error
    }
    const { data } = validation
    return {
      id: data.id,
      name: data.name,
      uiName: data.uiName,
      lat: data.lat,
      lng: data.lng,
      geohash: data.geohash,
    }
  }
}
