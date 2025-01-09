import { ConcertDTO } from '@/dtos/concert-dto'
import geohashUtils from '@/lib/geohashUtils'
import { LatLng } from '@/lib/types/types'

export const concertList = async ({
  orderBy,
  size,
  offset,
  latLng,
}: {
  orderBy: 'latest' | 'oldest'
  size: number
  offset: number
  latLng: LatLng | null
}) => {
  const geohash: string | null = latLng ? geohashUtils.generate(latLng.latitude, latLng.longitude, 3) : null

  const concertDTOs = await ConcertDTO.list({
    orderBy,
    take: +size,
    skip: +offset,
    venueGeohash: geohash,
  })

  return concertDTOs
}

export const concertSearchList = async ({
  titleKeyword,
  orderBy,
  size,
  offset,
}: {
  titleKeyword: string
  orderBy: 'latest' | 'oldest'
  size: number
  offset: number
}) => {
  const concertDTOs = await ConcertDTO.list({
    titleContains: titleKeyword,
    orderBy,
    take: +size,
    skip: +offset,
    venueGeohash: null,
  })

  return concertDTOs
}
