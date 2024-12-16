import { create } from 'zustand'
import { FULLY_EXPANDED_SNAP_INDEX } from './search-store.constants'
import { SearchStore } from './search-store.types'

export const useSearchStore = create<SearchStore>((set) => ({
  keyword: '',
  selectedLocationFilter: null,
  snapIndex: FULLY_EXPANDED_SNAP_INDEX,
  viewMode: 'list',
  setSnapIndex: (index) => set({ snapIndex: index }),
  setViewMode: (mode) => set({ viewMode: mode }),
  setKeyword: (keyword) => set({ keyword }),
  setSelectedLocationFilter: (filter) => set({ selectedLocationFilter: filter }),
}))
