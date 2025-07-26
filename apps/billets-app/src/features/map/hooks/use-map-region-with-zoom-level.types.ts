import type { Region } from 'react-native-maps';

export type MapRegionWithZoomLevel = Region & {
  zoomLevel: number;
};

export type UseMapRegionWithZoomLevelParams = {
  latitude: number;
  longitude: number;
};
