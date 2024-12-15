import { ConcertMapMarker, getZoomLevel, mapPointSchema, useMapPoints, useMapRegionWithZoomLevel } from '@/features'
import { useUserCurrentLocationStore } from '@/lib/stores/userCurrentLocationStore'
import { CommonScreenLayout } from '@/ui'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { StyleSheet } from 'react-native'
import MapView, { Camera, type Region } from 'react-native-maps'
import Supercluster from 'supercluster'
import { z } from 'zod'
import { useShallow } from 'zustand/shallow'

export const ConcertMapScreen = () => {
  const [supercluster] = useState(
    () =>
      new Supercluster({
        radius: 40,
        maxZoom: 16,
        minZoom: 1,
      }),
  )

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

  const [clusters, setClusters] = useState<z.infer<typeof mapPointSchema>[]>([])

  const onRegionChangeComplete = useCallback(
    (region: Region) => {
      setMapRegionWithZoomLevel({
        ...region,
        zoomLevel: getZoomLevel(region.latitudeDelta),
      })
    },
    [setMapRegionWithZoomLevel],
  )

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
