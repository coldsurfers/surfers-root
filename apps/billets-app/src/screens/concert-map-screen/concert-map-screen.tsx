import { $api } from '@/lib/api/openapi-client'
import { useUserCurrentLocationStore } from '@/lib/stores/userCurrentLocationStore'
import { CommonScreenLayout } from '@/ui'
import uniqBy from 'lodash.uniqby'
import geohash from 'ngeohash'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Text, View } from 'react-native'
import MapView, { Marker, type Region } from 'react-native-maps'
import Supercluster from 'supercluster'
import { z } from 'zod'
import { useShallow } from 'zustand/shallow'

const pointSchema = z.object({
  type: z.literal('Feature'),
  id: z.number(),
  originalId: z.string().uuid().optional(),
  properties: z.object({
    cluster: z.boolean().optional(),
    cluster_id: z.number().optional(),
    point_count: z.number().optional(),
    point_count_abbreviated: z.number().optional(),
  }),
  geometry: z.object({
    type: z.literal('Point'),
    coordinates: z.array(z.number()),
  }),
})

type MapRegionWithZoomLevel = Region & {
  zoomLevel: number
}

const getZoomLevel = (latitudeDelta: number): number => {
  const calculatedZoomLevel = Math.round(Math.log(360 / latitudeDelta) / Math.LN2)
  // return calculatedZoomLevel >= 5 ? 5 : calculatedZoomLevel
  return calculatedZoomLevel
}

export const ConcertMapScreen = () => {
  const { lat, lng } = useUserCurrentLocationStore(
    useShallow((state) => ({
      lat: state.latitude,
      lng: state.longitude,
    })),
  )

  const [mapRegionWithZoomLevel, setMapRegionWithZoomLevel] = useState<MapRegionWithZoomLevel>({
    latitude: lat ?? 37.78825,
    longitude: lng ?? -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    zoomLevel: getZoomLevel(0.0922),
  })

  const { data: locationConcerts } = $api.useQuery('get', '/v1/location/concert', {
    params: {
      query: {
        latitude: `${mapRegionWithZoomLevel.latitude}`,
        latitudeDelta: `${mapRegionWithZoomLevel.latitudeDelta}`,
        longitude: `${mapRegionWithZoomLevel.longitude}`,
        longitudeDelta: `${mapRegionWithZoomLevel.longitudeDelta}`,
        zoomLevel: `${mapRegionWithZoomLevel.zoomLevel}`,
      },
    },
  })

  // Example points - replace with your actual data
  const [points, setPoints] = useState<z.infer<typeof pointSchema>[]>([])

  useEffect(() => {
    if (!locationConcerts) {
      return
    }
    setPoints((prevPoints) => {
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
        } satisfies z.infer<typeof pointSchema>
      })
      const validation = pointSchema.array().safeParse(newPoints)
      if (validation.error) {
        return prevPoints
      }

      return uniqBy([...prevPoints, ...validation.data], 'originalId')
    })
  }, [locationConcerts])
  // const points = useMemo<z.infer<typeof pointSchema>[]>(() => {
  //   if (!locationConcerts) {
  //     return []
  //   }
  //   return locationConcerts.map((locationConcert, index) => {
  //     return {
  //       id: index,
  //       type: 'Feature',
  //       properties: { cluster_id: index },
  //       geometry: {
  //         type: 'Point',
  //         coordinates: [locationConcert.longitude, locationConcert.latitude],
  //       },
  //     }
  //   })
  // }, [locationConcerts])
  // const points = useMemo<z.infer<typeof pointSchema>[]>(
  //   () => [
  //     {
  //       id: 1,
  //       type: 'Feature',
  //       properties: { cluster_id: 1 },
  //       geometry: {
  //         type: 'Point',
  //         coordinates: [lng ?? -122.4324, lat ?? 37.78825],
  //       },
  //     },
  //     {
  //       id: 2,
  //       type: 'Feature',
  //       properties: { cluster_id: 2 },
  //       geometry: {
  //         type: 'Point',
  //         coordinates: [lng ?? -122.4324, lat ?? 37.78825],
  //       },
  //     },
  //     {
  //       type: 'Feature',
  //       id: 3,
  //       properties: { cluster_id: 3 },
  //       geometry: {
  //         type: 'Point',
  //         coordinates: [lng ?? -122.4325, lat ?? 37.7882],
  //       },
  //     },
  //     // Add more points as needed
  //   ],
  //   [lat, lng],
  // )

  const supercluster = useMemo(() => {
    return new Supercluster({
      radius: 40,
      maxZoom: 16,
      minZoom: 1,
    })
  }, [])

  const [clusters, setClusters] = useState<z.infer<typeof pointSchema>[]>([])

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

  const updateClusters = useCallback(
    (region: Region) => {
      setMapRegionWithZoomLevel({
        ...region,
        zoomLevel: getZoomLevel(region.latitudeDelta),
      })
      const zoomLevel = getZoomLevel(region.latitudeDelta)
      // const geohashes = getGeohashesForRegion(region, zoomLevel)

      const bbox = [
        region.longitude - region.longitudeDelta,
        region.latitude - region.latitudeDelta,
        region.longitude + region.longitudeDelta,
        region.latitude + region.latitudeDelta,
      ] as [number, number, number, number]

      supercluster.load(points)
      const clusters = supercluster.getClusters(bbox, zoomLevel)
      const clustersValidation = pointSchema.array().safeParse(clusters)

      if (clustersValidation.success) {
        setClusters(clustersValidation.data)
      } else {
        console.log(clusters)
        console.error(clustersValidation.error)
      }
    },
    [points, supercluster],
  )

  return (
    <CommonScreenLayout>
      <MapView
        onRegionChangeComplete={updateClusters}
        initialRegion={mapRegionWithZoomLevel}
        initialCamera={{
          center: {
            ...mapRegionWithZoomLevel,
          },
          pitch: 180,
          heading: 0,
          zoom: mapRegionWithZoomLevel.zoomLevel,
        }}
        zoomEnabled
        style={{
          flex: 1,
        }}
      >
        {clusters.map((point) => {
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
              key={properties.cluster_id}
              coordinate={{ latitude, longitude }}
              // Add your custom marker component or image here
            >
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
              />
            </Marker>
          )
        })}
      </MapView>
    </CommonScreenLayout>
  )
}
