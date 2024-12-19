import { create } from 'zustand'

export type UIStore = {
  bottomTabBarVisible: boolean
  showBottomTabBar: () => void
  hideBottomTabBar: () => void
}

export const useUIStore = create<UIStore>((set) => ({
  bottomTabBarVisible: true,
  showBottomTabBar: () => set({ bottomTabBarVisible: true }),
  hideBottomTabBar: () => set({ bottomTabBarVisible: false }),
}))
