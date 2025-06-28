import { useCallback, useState } from 'react';
import type { LatLng } from 'react-native-maps';
import { getZoomLevel } from '../utils';
import type {
  MapRegionWithZoomLevel,
  UseMapRegionWithZoomLevelParams,
} from './use-map-region-with-zoom-level.types';

const DEFAULT_LATITUDE_DELTA = 0.4122;
const DEFAULT_LONGITUDE_DELTA = 0.3621;

export const useMapRegionWithZoomLevel = ({
  latitude,
  longitude,
}: UseMapRegionWithZoomLevelParams) => {
  const [mapRegionWithZoomLevel, setMapRegionWithZoomLevel] = useState<MapRegionWithZoomLevel>({
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: DEFAULT_LATITUDE_DELTA,
    longitudeDelta: DEFAULT_LONGITUDE_DELTA,
    zoomLevel: getZoomLevel(DEFAULT_LATITUDE_DELTA),
  });

  const initialize = useCallback((params: LatLng) => {
    const initialState = {
      latitude: params.latitude,
      longitude: params.longitude,
      latitudeDelta: DEFAULT_LATITUDE_DELTA,
      longitudeDelta: DEFAULT_LONGITUDE_DELTA,
      zoomLevel: getZoomLevel(DEFAULT_LATITUDE_DELTA),
    };
    setMapRegionWithZoomLevel(initialState);
    return initialState;
  }, []);

  return {
    mapRegionWithZoomLevel,
    setMapRegionWithZoomLevel,
    initialize,
  };
};
