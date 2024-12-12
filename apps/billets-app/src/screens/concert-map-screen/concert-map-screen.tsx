import { useUserCurrentLocationStore } from '@/lib/stores/userCurrentLocationStore'
import { CommonScreenLayout } from '@/ui'
import geohash from 'ngeohash'
import { useCallback, useMemo, useState } from 'react'
import { Text, View } from 'react-native'
import MapView, { Marker, type Region } from 'react-native-maps'
import Supercluster from 'supercluster'
import { useShallow } from 'zustand/shallow'

interface Point {
  type: 'Feature'
  properties: {
    cluster?: boolean
    pointCount?: number
    id: string
  }
  geometry: {
    type: 'Point'
    coordinates: [number, number]
  }
}

export const ConcertMapScreen = () => {
  const { lat, lng } = useUserCurrentLocationStore(
    useShallow((state) => ({
      lat: state.latitude,
      lng: state.longitude,
    })),
  )

  // Example points - replace with your actual data
  const points: Point[] = useMemo(
    () => [
      {
        type: 'Feature',
        properties: { id: '1' },
        geometry: {
          type: 'Point',
          coordinates: [lng ?? -122.4324, lat ?? 37.78825],
        },
      },
      {
        type: 'Feature',
        properties: { id: '2' },
        geometry: {
          type: 'Point',
          coordinates: [lng ?? -122.4324, lat ?? 37.78825],
        },
      },
      {
        type: 'Feature',
        properties: { id: '3' },
        geometry: {
          type: 'Point',
          coordinates: [lng ?? -122.4325, lat ?? 37.7882],
        },
      },
      // Add more points as needed
    ],
    [lat, lng],
  )

  const supercluster = useMemo(() => {
    return new Supercluster({
      radius: 40,
      maxZoom: 16,
      minZoom: 1,
    })
  }, [])

  const [clusters, setClusters] = useState<Point[]>([])

  const getGeohashesForRegion = (region: Region, zoomLevel: number) => {
    const { latitude, longitude, latitudeDelta, longitudeDelta } = region
    const precision = Math.max(1, Math.min(12, Math.floor(zoomLevel / 2)))

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

  const updateClusters = useCallback(
    (region: Region) => {
      const zoomLevel = getZoomLevel(region.latitudeDelta)
      const geohashes = getGeohashesForRegion(region, zoomLevel)

      const bbox = [
        region.longitude - region.longitudeDelta,
        region.latitude - region.latitudeDelta,
        region.longitude + region.longitudeDelta,
        region.latitude + region.latitudeDelta,
      ] as [number, number, number, number]

      supercluster.load(points)
      const clusters = supercluster.getClusters(bbox, zoomLevel)
      setClusters(clusters)

      console.log('Zoom level:', zoomLevel)
      console.log('Geohashes:', geohashes)
      console.log('Clusters:', clusters)
    },
    [points, supercluster],
  )

  console.log(clusters)

  return (
    <CommonScreenLayout>
      <MapView
        onRegionChangeComplete={updateClusters}
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
      >
        {clusters.map((point) => {
          console.log('point', point)
          const { properties, geometry } = point
          const [longitude, latitude] = geometry.coordinates

          if (properties.cluster) {
            return (
              <Marker key={`cluster-${properties.cluster_id}`} coordinate={{ latitude, longitude }}>
                <View
                  style={{
                    backgroundColor: '#007AFF',
                    borderRadius: 20,
                    padding: 8,
                    width: 40,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>{properties.point_count}</Text>
                </View>
              </Marker>
            )
          }

          return (
            <Marker
              key={properties.id}
              coordinate={{ latitude, longitude }}
              // Add your custom marker component or image here
            />
          )
        })}
      </MapView>
    </CommonScreenLayout>
  )
}
