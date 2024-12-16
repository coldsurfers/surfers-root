import { useUserCurrentLocationStore } from '@/lib/stores/userCurrentLocationStore'
import { useCallback, useMemo } from 'react'
import { StyleSheet } from 'react-native'
import MapView, { Camera, Region } from 'react-native-maps'
import { useShallow } from 'zustand/shallow'
import { useMapPoints, useMapRegionWithZoomLevel, useSuperCluster } from '../../hooks'
import { getZoomLevel } from '../../utils'
import { ConcertMapMarker } from '../concert-map-marker'

export const ConcertMapView = () => {
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

  const { points } = useMapPoints({
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
