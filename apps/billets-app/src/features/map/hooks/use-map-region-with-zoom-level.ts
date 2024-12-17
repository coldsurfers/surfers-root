import { useState } from 'react'
import { getZoomLevel } from '../utils'
import { MapRegionWithZoomLevel, UseMapRegionWithZoomLevelParams } from './use-map-region-with-zoom-level.types'

export const useMapRegionWithZoomLevel = ({ latitude, longitude }: UseMapRegionWithZoomLevelParams) => {
  const [mapRegionWithZoomLevel, setMapRegionWithZoomLevel] = useState<MapRegionWithZoomLevel>({
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    zoomLevel: getZoomLevel(0.0922),
  })

  return {
    mapRegionWithZoomLevel,
    setMapRegionWithZoomLevel,
  }
}
