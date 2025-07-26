import { create } from 'zustand';
import { FULLY_EXPANDED_SNAP_INDEX } from './search-store.constants';
import type { SearchStore } from './search-store.types';

// @todo: refactor later to divide search store and map store
export const useSearchStore = create<SearchStore>((set) => ({
  keyword: '',
  selectedLocationFilter: null,
  snapIndex: FULLY_EXPANDED_SNAP_INDEX,
  viewMode: 'list',
  locationConcerts: null,
  setSnapIndex: (index) => set({ snapIndex: index }),
  setViewMode: (mode) => set({ viewMode: mode }),
  setKeyword: (keyword) => set({ keyword }),
  setSelectedLocationFilter: (filter) => set({ selectedLocationFilter: filter }),
  setLocationConcerts: (locationConcerts) => set({ locationConcerts }),
}));
