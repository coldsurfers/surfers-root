import { currentLocationStorage } from '@/lib/storage'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { UserCurrentLocationStore } from './user-current-location-store.types'

export const useUserCurrentLocationStore = create<UserCurrentLocationStore>()(
  persist(
    (set) => ({
      latitude: null,
      longitude: null,
      setUserCurrentLocation: (payload) =>
        set(() => ({
          latitude: payload.latitude,
          longitude: payload.longitude,
        })),
    }),
    {
      name: 'useUserCurrentLocationStoreStorage',
      storage: currentLocationStorage,
    },
  ),
)
