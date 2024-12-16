export type SearchStoreLocationFilterType = 'current-location' | 'map-location'
export type SearchStoreViewMode = 'map' | 'list'
export type SearchStoreSnapIndex = 0 | 1

export interface SearchStoreState {
  keyword: string
  selectedLocationFilter: SearchStoreLocationFilterType | null
  snapIndex: SearchStoreSnapIndex
  viewMode: SearchStoreViewMode
}

export interface SearchStoreActions {
  setKeyword: (keyword: string) => void
  setSelectedLocationFilter: (filter: SearchStoreLocationFilterType | null) => void
  setSnapIndex: (index: SearchStoreSnapIndex) => void
  setViewMode: (mode: SearchStoreViewMode) => void
}
export type SearchStore = SearchStoreState & SearchStoreActions
