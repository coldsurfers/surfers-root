import { create } from 'zustand'
import { SearchStore } from './search-store.types'

export const useSearchStore = create<SearchStore>((set) => ({
  keyword: '',
  setKeyword: (keyword) => set({ keyword }),
}))
