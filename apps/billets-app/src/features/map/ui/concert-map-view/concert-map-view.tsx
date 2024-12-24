import { memo, useEffect, useMemo } from 'react'
import { StyleSheet } from 'react-native'
import MapView, { Camera, Region } from 'react-native-maps'
import { z } from 'zod'
import { MapRegionWithZoomLevel, useMapPoints, useSuperCluster } from '../../hooks'
import { mapPointSchema } from '../../map.types'
import { ConcertMapMarker } from '../concert-map-marker'

export const ConcertMapView = memo(
  ({
    mapRegionWithZoomLevel,
    onChangeClusters,
    onChangePoints,
    onChangeVisiblePoints,
    onChangeLocationConcerts,
    onRegionChangeComplete,
  }: {
    mapRegionWithZoomLevel: MapRegionWithZoomLevel
    onRegionChangeComplete: (region: Region) => void
    onChangeClusters?: (clusters: z.infer<typeof mapPointSchema>[]) => void
    onChangePoints?: (points: z.infer<typeof mapPointSchema>[]) => void
    onChangeVisiblePoints?: (visiblePoints: z.infer<typeof mapPointSchema>[]) => void
    onChangeLocationConcerts?: (
      locationConcerts: {
        id: string
        latitude: number
        longitude: number
        title: string
      }[],
    ) => void
  }) => {
    const { points, visiblePoints, locationConcerts } = useMapPoints({
      mapRegionWithZoomLevel,
    })

    const { clusters } = useSuperCluster({
      mapRegionWithZoomLevel,
      points,
    })

    const initialCamera = useMemo<Camera>(() => {
      return {
        center: {
          ...mapRegionWithZoomLevel,
        },
        pitch: 180,
        heading: 0,
        zoom: mapRegionWithZoomLevel.zoomLevel,
      }
    }, [mapRegionWithZoomLevel])

    useEffect(() => {
      onChangeClusters?.(clusters)
      onChangePoints?.(points)
      onChangeVisiblePoints?.(visiblePoints)
      onChangeLocationConcerts?.(locationConcerts ?? [])
    }, [
      clusters,
      locationConcerts,
      onChangeClusters,
      onChangeLocationConcerts,
      onChangePoints,
      onChangeVisiblePoints,
      points,
      visiblePoints,
    ])

    return (
      <MapView
        onRegionChangeComplete={onRegionChangeComplete}
        initialRegion={mapRegionWithZoomLevel}
        initialCamera={initialCamera}
        zoomEnabled
        style={styles.map}
      >
        <ConcertMapMarker clusters={clusters} />
      </MapView>
    )
  },
)

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
})
