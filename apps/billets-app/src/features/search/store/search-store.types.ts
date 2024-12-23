export type SearchStoreLocationFilterType = 'current-location' | 'map-location'
export type SearchStoreViewMode = 'map' | 'list'
export type SearchStoreSnapIndex = 0 | 1
export type SearchStoreLocationConcert = {
  id: string
  latitude: number
  longitude: number
  title: string
}

// @todo: refactor later to divide search store and map store

export interface SearchStoreState {
  keyword: string
  selectedLocationFilter: SearchStoreLocationFilterType | null
  snapIndex: SearchStoreSnapIndex
  viewMode: SearchStoreViewMode
  locationConcerts: SearchStoreLocationConcert[] | null
}

export interface SearchStoreActions {
  setKeyword: (keyword: string) => void
  setSelectedLocationFilter: (filter: SearchStoreLocationFilterType | null) => void
  setSnapIndex: (index: SearchStoreSnapIndex) => void
  setViewMode: (mode: SearchStoreViewMode) => void
  setLocationConcerts: (locationConcerts: SearchStoreLocationConcert[] | null) => void
}
export type SearchStore = SearchStoreState & SearchStoreActions
