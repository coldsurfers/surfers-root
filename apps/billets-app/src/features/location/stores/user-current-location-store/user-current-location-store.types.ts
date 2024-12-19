import { LatLng } from '@/types/LatLng'

export interface UserCurrentLocationStoreState {
  latitude: number | null
  longitude: number | null
}

export interface UserCurrentLocationStoreAction {
  setUserCurrentLocation: (payload: LatLng) => void
}

export type UserCurrentLocationStore = UserCurrentLocationStoreState & UserCurrentLocationStoreAction
