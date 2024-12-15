import { ConcertMapMarker, mapPointSchema } from '@/features'
import { $api } from '@/lib/api/openapi-client'
import { useUserCurrentLocationStore } from '@/lib/stores/userCurrentLocationStore'
import { CommonScreenLayout } from '@/ui'
import uniqBy from 'lodash.uniqby'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { StyleSheet } from 'react-native'
import MapView, { Camera, type Region } from 'react-native-maps'
import Supercluster from 'supercluster'
import { z } from 'zod'
import { useShallow } from 'zustand/shallow'

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
  const [points, setPoints] = useState<z.infer<typeof mapPointSchema>[]>([])

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
        } satisfies z.infer<typeof mapPointSchema>
      })
      const validation = mapPointSchema.array().safeParse(newPoints)
      if (validation.error) {
        console.error(validation.error)
        return prevPoints
      }

      const newValue = uniqBy([...prevPoints, ...validation.data], 'originalId')
      return newValue
    })
  }, [locationConcerts])

  const [clusters, setClusters] = useState<z.infer<typeof mapPointSchema>[]>([])

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
    const clustersValidation = mapPointSchema.array().safeParse(clusters)

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
