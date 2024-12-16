import { create } from 'zustand'
import { SearchStore } from './search-store.types'

export const useSearchStore = create<SearchStore>((set) => ({
  keyword: '',
  selectedLocationFilter: null,
  setKeyword: (keyword) => set({ keyword }),
  setSelectedLocationFilter: (filter) => set({ selectedLocationFilter: filter }),
}))
