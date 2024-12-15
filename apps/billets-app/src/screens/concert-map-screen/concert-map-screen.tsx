import { ConcertMapMarker, getZoomLevel, useMapPoints, useMapRegionWithZoomLevel, useSuperCluster } from '@/features'
import { useUserCurrentLocationStore } from '@/lib/stores/userCurrentLocationStore'
import { CommonScreenLayout } from '@/ui'
import { useCallback, useMemo } from 'react'
import { StyleSheet } from 'react-native'
import MapView, { Camera, type Region } from 'react-native-maps'
import { useShallow } from 'zustand/shallow'

export const ConcertMapScreen = () => {
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
    <CommonScreenLayout>
      <MapView
        onRegionChangeComplete={onRegionChangeComplete}
        initialRegion={mapRegionWithZoomLevel}
        initialCamera={initialCamera}
        zoomEnabled
        style={styles.map}
      >
        <ConcertMapMarker clusters={clusters} />
      </MapView>
    </CommonScreenLayout>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
})
