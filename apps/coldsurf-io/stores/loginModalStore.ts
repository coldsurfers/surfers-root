import { create } from 'zustand'

type LoginModalStore = {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const useLoginModalStore = create<LoginModalStore>((set) => ({
  isOpen: false,
  open: () => set(() => ({ isOpen: true })),
  close: () => set(() => ({ isOpen: false })),
}))
