import { $api } from '@/lib/api/openapi-client'
import uniqBy from 'lodash.uniqby'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import { mapPointSchema } from '../map.types'
import { MapRegionWithZoomLevel } from './use-map-region-with-zoom-level.types'

export const useMapPoints = ({ mapRegionWithZoomLevel }: { mapRegionWithZoomLevel: MapRegionWithZoomLevel }) => {
  const { data: locationConcerts, isLoading: isLoadingLocationConcerts } = $api.useQuery(
    'get',
    '/v1/location/concert',
    {
      params: {
        query: {
          latitude: mapRegionWithZoomLevel.latitude,
          latitudeDelta: mapRegionWithZoomLevel.latitudeDelta,
          longitude: mapRegionWithZoomLevel.longitude,
          longitudeDelta: mapRegionWithZoomLevel.longitudeDelta,
          zoomLevel: mapRegionWithZoomLevel.zoomLevel,
        },
      },
    },
  )

  const [points, setPoints] = useState<z.infer<typeof mapPointSchema>[]>([])
  const [visiblePoints, setVisiblePoints] = useState<z.infer<typeof mapPointSchema>[]>([])

  useEffect(() => {
    if (!locationConcerts) {
      return
    }
    const newPoints = locationConcerts.map((locationConcert, index) => {
      return {
        id: index,
        originalId: locationConcert.id,
        type: 'Feature',
        properties: { cluster_id: index },
        geometry: {
          type: 'Point',
          coordinates: [locationConcert.longitude, locationConcert.latitude],
        },
      } satisfies z.infer<typeof mapPointSchema>
    })
    setVisiblePoints(newPoints)
    setPoints((prevPoints) => {
      const validation = mapPointSchema.array().safeParse(newPoints)
      if (validation.error) {
        console.error(validation.error)
        return prevPoints
      }

      const newValue = uniqBy([...prevPoints, ...validation.data], 'originalId')
      return newValue
    })
  }, [locationConcerts])

  return {
    locationConcerts,
    isLoadingLocationConcerts,
    points,
    setPoints,
    visiblePoints,
  }
}
