'use client'

import { create } from 'zustand'

type LinkStore = {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}

export const useLinkStore = create<LinkStore>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
}))
