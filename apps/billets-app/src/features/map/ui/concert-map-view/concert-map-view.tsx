import { useUserCurrentLocationStore } from '@/lib/stores/userCurrentLocationStore'
import { useCallback, useEffect, useMemo } from 'react'
import { StyleSheet } from 'react-native'
import MapView, { Camera, Region } from 'react-native-maps'
import { z } from 'zod'
import { useShallow } from 'zustand/shallow'
import { useMapPoints, useMapRegionWithZoomLevel, useSuperCluster } from '../../hooks'
import { mapPointSchema } from '../../map.types'
import { getZoomLevel } from '../../utils'
import { ConcertMapMarker } from '../concert-map-marker'

export const ConcertMapView = ({
  onChangeClusters,
  onChangePoints,
  onChangeVisiblePoints,
}: {
  onChangeClusters?: (clusters: z.infer<typeof mapPointSchema>[]) => void
  onChangePoints?: (concerts: z.infer<typeof mapPointSchema>[]) => void
  onChangeVisiblePoints?: (concerts: z.infer<typeof mapPointSchema>[]) => void
}) => {
  const { lat, lng } = useUserCurrentLocationStore(
    useShallow((state) => ({
      lat: state.latitude,
      lng: state.longitude,
    })),
  )
  const { mapRegionWithZoomLevel, setMapRegionWithZoomLevel } = useMapRegionWithZoomLevel({
    latitude: lat ?? 37.78825,
    longitude: lng ?? -122.4324,
  })

  const { points, visiblePoints } = useMapPoints({
    mapRegionWithZoomLevel,
  })

  const { clusters } = useSuperCluster({
    mapRegionWithZoomLevel,
    points,
  })

  const onRegionChangeComplete = useCallback(
    (region: Region) => {
      setMapRegionWithZoomLevel({
        ...region,
        zoomLevel: getZoomLevel(region.latitudeDelta),
      })
    },
    [setMapRegionWithZoomLevel],
  )

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
  }, [clusters, onChangeClusters, onChangePoints, onChangeVisiblePoints, points, visiblePoints])

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
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
})
