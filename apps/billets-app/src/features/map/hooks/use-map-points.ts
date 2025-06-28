import { apiClient } from '@/lib/api/openapi-client';
import { useQuery } from '@tanstack/react-query';
import uniqBy from 'lodash.uniqby';
import { useEffect, useMemo, useState } from 'react';
import type { z } from 'zod';
import { mapPointSchema } from '../map.types';
import type { MapRegionWithZoomLevel } from './use-map-region-with-zoom-level.types';

export const useMapPoints = ({
  mapRegionWithZoomLevel,
}: { mapRegionWithZoomLevel: MapRegionWithZoomLevel }) => {
  const queryParams = useMemo(
    () => ({
      latitude: mapRegionWithZoomLevel.latitude,
      latitudeDelta: mapRegionWithZoomLevel.latitudeDelta,
      longitude: mapRegionWithZoomLevel.longitude,
      longitudeDelta: mapRegionWithZoomLevel.longitudeDelta,
      zoomLevel: mapRegionWithZoomLevel.zoomLevel,
    }),
    [
      mapRegionWithZoomLevel.latitude,
      mapRegionWithZoomLevel.latitudeDelta,
      mapRegionWithZoomLevel.longitude,
      mapRegionWithZoomLevel.longitudeDelta,
      mapRegionWithZoomLevel.zoomLevel,
    ]
  );
  const { data: locationConcerts, isLoading: isLoadingLocationConcerts } = useQuery({
    queryKey: apiClient.location.queryKeys.concerts(queryParams),
    queryFn: () => apiClient.location.getConcerts(queryParams),
  });

  const [points, setPoints] = useState<z.infer<typeof mapPointSchema>[]>([]);
  const [visiblePoints, setVisiblePoints] = useState<z.infer<typeof mapPointSchema>[]>([]);

  useEffect(() => {
    if (!locationConcerts) {
      return;
    }
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
      } satisfies z.infer<typeof mapPointSchema>;
    });
    setVisiblePoints(newPoints);
    setPoints((prevPoints) => {
      const validation = mapPointSchema.array().safeParse(newPoints);
      if (validation.error) {
        console.error(validation.error);
        return prevPoints;
      }

      const newValue = uniqBy([...prevPoints, ...validation.data], 'originalId');
      return newValue;
    });
  }, [locationConcerts]);

  return {
    locationConcerts,
    isLoadingLocationConcerts,
    points,
    setPoints,
    visiblePoints,
  };
};
