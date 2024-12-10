import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { LatLng } from '../../types/LatLng'
import { currentLocationStorage } from '../storage/current-location-storage'

export interface UserCurrentLocationStoreState {
  latitude: number | null
  longitude: number | null
}

export interface UserCurrentLocationStoreAction {
  setUserCurrentLocation: (payload: LatLng) => void
}

export type UserCurrentLocationStore = UserCurrentLocationStoreState & UserCurrentLocationStoreAction

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
