import { forwardRef, memo, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { type Region } from 'react-native-maps';
import type { z } from 'zod';
import { type MapRegionWithZoomLevel, useMapPoints, useSuperCluster } from '../../hooks';
import type { mapPointSchema } from '../../map.types';
import { ConcertMapMarker } from '../concert-map-marker';

type ConcertMapViewProps = {
  mapRegionWithZoomLevel: MapRegionWithZoomLevel;
  onRegionChangeComplete: (region: Region) => void;
  onChangeClusters?: (clusters: z.infer<typeof mapPointSchema>[]) => void;
  onChangePoints?: (points: z.infer<typeof mapPointSchema>[]) => void;
  onChangeVisiblePoints?: (visiblePoints: z.infer<typeof mapPointSchema>[]) => void;
  onChangeLocationConcerts?: (
    locationConcerts: {
      id: string;
      latitude: number;
      longitude: number;
      title: string;
    }[]
  ) => void;
};

export const ConcertMapView = memo(
  forwardRef<MapView, ConcertMapViewProps>(
    (
      {
        mapRegionWithZoomLevel,
        onChangeClusters,
        onChangePoints,
        onChangeVisiblePoints,
        onChangeLocationConcerts,
        onRegionChangeComplete,
      },
      ref
    ) => {
      const { points, visiblePoints, locationConcerts } = useMapPoints({
        mapRegionWithZoomLevel,
      });

      const { clusters } = useSuperCluster({
        mapRegionWithZoomLevel,
        points,
      });

      useEffect(() => {
        onChangeClusters?.(clusters);
        onChangePoints?.(points);
        onChangeVisiblePoints?.(visiblePoints);
        onChangeLocationConcerts?.(locationConcerts ?? []);
      }, [
        clusters,
        locationConcerts,
        onChangeClusters,
        onChangeLocationConcerts,
        onChangePoints,
        onChangeVisiblePoints,
        points,
        visiblePoints,
      ]);

      return (
        <MapView
          ref={ref}
          onRegionChangeComplete={onRegionChangeComplete}
          initialRegion={mapRegionWithZoomLevel}
          zoomEnabled
          style={styles.map}
        >
          <ConcertMapMarker clusters={clusters} />
        </MapView>
      );
    }
  )
);

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
