import { useEffect, useState } from 'react';
import Supercluster from 'supercluster';
import type { z } from 'zod';
import { mapPointSchema } from '../map.types';
import { getZoomLevel } from '../utils';
import type { MapRegionWithZoomLevel } from './use-map-region-with-zoom-level.types';

export const useSuperCluster = ({
  mapRegionWithZoomLevel,
  points,
}: {
  mapRegionWithZoomLevel: MapRegionWithZoomLevel;
  points: z.infer<typeof mapPointSchema>[];
}) => {
  const [supercluster] = useState(
    () =>
      new Supercluster({
        radius: 40,
        maxZoom: 16,
        minZoom: 1,
      })
  );

  const [clusters, setClusters] = useState<z.infer<typeof mapPointSchema>[]>([]);

  useEffect(() => {
    const region = mapRegionWithZoomLevel;
    const zoomLevel = getZoomLevel(region.latitudeDelta);

    const bbox = [
      region.longitude - region.longitudeDelta,
      region.latitude - region.latitudeDelta,
      region.longitude + region.longitudeDelta,
      region.latitude + region.latitudeDelta,
    ] as [number, number, number, number];

    supercluster.load(points);
    const clusters = supercluster.getClusters(bbox, zoomLevel);
    const clustersValidation = mapPointSchema.array().safeParse(clusters);

    if (clustersValidation.success) {
      setClusters(clustersValidation.data);
    } else {
      console.error(clustersValidation.error);
    }
  }, [mapRegionWithZoomLevel, points, supercluster]);

  return {
    clusters,
    supercluster,
  };
};
