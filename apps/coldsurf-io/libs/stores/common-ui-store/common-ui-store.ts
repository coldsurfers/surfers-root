import { create } from 'zustand'

interface CommonUIStore {
  floatingSearchBarVisible: boolean
  openFloatingSearchBar: () => void
  closeFloatingSearchBar: () => void
}

export const useCommonUIStore = create<CommonUIStore>((set) => ({
  floatingSearchBarVisible: false,
  openFloatingSearchBar: () => set({ floatingSearchBarVisible: true }),
  closeFloatingSearchBar: () => set({ floatingSearchBarVisible: false }),
}))
