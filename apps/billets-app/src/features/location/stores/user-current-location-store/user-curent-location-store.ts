import { currentLocationStorage } from '@/lib/storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserCurrentLocationStore } from './user-current-location-store.types';

export const useUserCurrentLocationStore = create<UserCurrentLocationStore>()(
  persist(
    (set) => ({
      latitude: null,
      longitude: null,
      cityName: null,
      cityId: null,
      type: null,
      setUserCurrentLocation: (payload) =>
        set(() => ({
          latitude: payload.latitude,
          longitude: payload.longitude,
          cityName: payload.cityName,
          type: payload.type,
          cityId: payload.cityId,
        })),
    }),
    {
      name: 'useUserCurrentLocationStoreStorage',
      storage: currentLocationStorage,
    }
  )
);
