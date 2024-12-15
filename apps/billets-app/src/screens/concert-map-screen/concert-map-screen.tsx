import { $api } from '@/lib/api/openapi-client'
import { useUserCurrentLocationStore } from '@/lib/stores/userCurrentLocationStore'
import { CommonScreenLayout } from '@/ui'
import { colors } from '@coldsurfers/ocean-road'
import { Text } from '@coldsurfers/ocean-road/native'
import uniqBy from 'lodash.uniqby'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import MapView, { Camera, Marker, type Region } from 'react-native-maps'
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
  return calculatedZoomLevel
}

export const ConcertMapScreen = () => {
  const { lat, lng } = useUserCurrentLocationStore(
    useShallow((state) => ({
      lat: state.latitude,
      lng: state.longitude,
    })),
  )
  const [supercluster] = useState(
    () =>
      new Supercluster({
        radius: 40,
        maxZoom: 16,
        minZoom: 1,
      }),
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
        console.error(validation.error)
        return prevPoints
      }

      const newValue = uniqBy([...prevPoints, ...validation.data], 'originalId')
      return newValue
    })
  }, [locationConcerts])

  const [clusters, setClusters] = useState<z.infer<typeof pointSchema>[]>([])

  const updateClusters = useCallback((region: Region) => {
    setMapRegionWithZoomLevel({
      ...region,
      zoomLevel: getZoomLevel(region.latitudeDelta),
    })
  }, [])

  useEffect(() => {
    const region = mapRegionWithZoomLevel
    const zoomLevel = getZoomLevel(region.latitudeDelta)

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
      console.error(clustersValidation.error)
    }
  }, [mapRegionWithZoomLevel, points, supercluster])

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
        onRegionChangeComplete={updateClusters}
        initialRegion={mapRegionWithZoomLevel}
        initialCamera={initialCamera}
        zoomEnabled
        style={styles.map}
      >
        {clusters.map((point) => {
          const { properties, geometry } = point
          const [longitude, latitude] = geometry.coordinates

          if (properties.cluster) {
            return (
              <Marker key={`cluster-${properties.cluster_id}`} coordinate={{ latitude, longitude }}>
                <View style={styles.circleMarker}>
                  <Text weight="bold" style={styles.markerText}>
                    {properties.point_count}
                  </Text>
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
              <View style={styles.circleMarker} />
            </Marker>
          )
        })}
      </MapView>
    </CommonScreenLayout>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  circleMarker: {
    backgroundColor: colors.oc.blue[8].value,
    borderRadius: 20,
    padding: 8,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerText: { color: colors.oc.white.value },
})
