import { useUserCurrentLocationStore } from '@/lib/stores/userCurrentLocationStore'
import { CommonScreenLayout } from '@/ui'
import geohash from 'ngeohash'
import MapView, { type Region } from 'react-native-maps'
import { useShallow } from 'zustand/shallow'

export const ConcertMapScreen = () => {
  const { lat, lng } = useUserCurrentLocationStore(
    useShallow((state) => ({
      lat: state.latitude,
      lng: state.longitude,
    })),
  )
  const getGeohashesForRegion = (region: Region, zoomLevel: number) => {
    const { latitude, longitude, latitudeDelta, longitudeDelta } = region
    const precision = zoomLevel / 2

    // Calculate the corners of the visible region
    const northLat = latitude + latitudeDelta / 2
    const southLat = latitude - latitudeDelta / 2
    const westLng = longitude - longitudeDelta / 2
    const eastLng = longitude + longitudeDelta / 2

    // Get geohashes for the corners
    const northEast = geohash.encode(northLat, eastLng, precision)
    const northWest = geohash.encode(northLat, westLng, precision)
    const southEast = geohash.encode(southLat, eastLng, precision)
    const southWest = geohash.encode(southLat, westLng, precision)

    return {
      northEast,
      northWest,
      southEast,
      southWest,
      center: geohash.encode(latitude, longitude, precision),
    }
  }

  const getZoomLevel = (latitudeDelta: number): number => {
    return Math.round(Math.log(360 / latitudeDelta) / Math.LN2)
  }

  return (
    <CommonScreenLayout>
      <MapView
        onRegionChangeComplete={(region) => {
          const { latitude, longitude } = region
          const zoomLevel = getZoomLevel(region.latitudeDelta)
          const geohashes = getGeohashesForRegion(region, zoomLevel)
          console.log('Zoom level:', zoomLevel)
          console.log('Geohashes:', geohashes)
        }}
        initialRegion={{
          latitude: lat ?? 37.78825,
          longitude: lng ?? -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        initialCamera={{
          center: {
            latitude: lat ?? 37.78825,
            longitude: lng ?? -122.4324,
          },
          pitch: 180,
          heading: 0,
        }}
        zoomEnabled
        style={{
          flex: 1,
        }}
      ></MapView>
    </CommonScreenLayout>
  )
}
