import { match } from 'ts-pattern';
import { FULLY_EXPANDED_SNAP_INDEX } from './search-store.constants';
import type { SearchStoreLocationFilterType, SearchStoreSnapIndex } from './search-store.types';

export const getSearchFilterUIValue = (filter: SearchStoreLocationFilterType) => {
  return match(filter)
    .with('current-location', () => '현재 위치')
    .with('map-location', () => '지도 기반 위치')
    .exhaustive();
};

export const getViewMode = (snapIndex: SearchStoreSnapIndex) => {
  if (snapIndex >= FULLY_EXPANDED_SNAP_INDEX) {
    return 'list';
  }
  return 'map';
};
