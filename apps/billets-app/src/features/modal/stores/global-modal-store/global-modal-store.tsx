import { create } from 'zustand';

type ModalVisible = {
  geolocationPermissionAlertModal: boolean;
};

type GlobalModalStore = {
  visible: ModalVisible;
  open: (key: keyof ModalVisible) => void;
  close: (key: keyof ModalVisible) => void;
};

export const useGlobalModalStore = create<GlobalModalStore>((set) => ({
  visible: {
    geolocationPermissionAlertModal: false,
  },
  open: (key: keyof ModalVisible) => {
    set((state) => ({
      visible: {
        ...Object.keys(state.visible).reduce(
          (acc, modalKey) => ({
            // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
            ...acc,
            [modalKey]: modalKey === key,
          }),
          {
            geolocationPermissionAlertModal: false,
          } as ModalVisible
        ),
      },
    }));
  },
  close: (key: keyof ModalVisible) => {
    set((state) => ({
      visible: {
        ...state.visible,
        [key]: false,
      },
    }));
  },
}));
