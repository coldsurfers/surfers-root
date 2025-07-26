import { create } from 'zustand';
import type { Link } from '../(data)/data.types';

export type CommonStore = {
  isShareModalVisible: boolean;
  toggleShareModalVisible: () => void;
  sharedLink: Link | null;
  setSharedLink: (link: Link | null) => void;
};

export const useCommonStore = create<CommonStore>((set) => ({
  isShareModalVisible: false,
  toggleShareModalVisible: () =>
    set((state) => ({ isShareModalVisible: !state.isShareModalVisible })),
  sharedLink: null,
  setSharedLink: (link: Link | null) => set({ sharedLink: link }),
}));
