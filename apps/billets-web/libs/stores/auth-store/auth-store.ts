import { create } from 'zustand'

export const useAuthStore = create<{
  isLoggedIn: boolean
  setIsLoggedIn: (isLoggedIn: boolean) => void
}>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
}))
