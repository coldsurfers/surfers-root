import { create } from 'zustand';

interface LoginModalStore {
  isVisible: boolean;
  open: () => void;
  close: () => void;
}

export const useLoginModalStore = create<LoginModalStore>((set) => ({
  isVisible: false,
  open: () => set({ isVisible: true }),
  close: () => set({ isVisible: false }),
}));
