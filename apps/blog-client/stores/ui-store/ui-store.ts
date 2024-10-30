import { create } from 'zustand'
import { UIStore } from './ui-store.types'

export const useUIStore = create<UIStore>()((set) => ({
  activeTab: 'main',
  setActiveTab: (tab) =>
    set({
      activeTab: tab,
    }),
}))
