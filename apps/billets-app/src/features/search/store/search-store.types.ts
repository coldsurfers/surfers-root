export type SearchStoreLocationFilterType = 'current-location' | 'map-location'

export interface SearchStoreState {
  keyword: string
  selectedLocationFilter: SearchStoreLocationFilterType | null
}

export interface SearchStoreActions {
  setKeyword: (keyword: string) => void
  setSelectedLocationFilter: (filter: SearchStoreLocationFilterType | null) => void
}
export type SearchStore = SearchStoreState & SearchStoreActions
