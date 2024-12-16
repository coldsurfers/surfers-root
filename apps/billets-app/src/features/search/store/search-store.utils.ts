import { match } from 'ts-pattern'
import { SearchStoreLocationFilterType } from './search-store.types'

export const getSearchFilterUIValue = (filter: SearchStoreLocationFilterType) => {
  return match(filter)
    .with('current-location', () => '현재 위치')
    .with('map-location', () => '지도 기반 위치')
    .exhaustive()
}
