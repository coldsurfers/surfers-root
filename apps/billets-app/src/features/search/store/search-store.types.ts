export interface SearchStoreState {
  keyword: string
}

export interface SearchStoreActions {
  setKeyword: (keyword: string) => void
}
export type SearchStore = SearchStoreState & SearchStoreActions
