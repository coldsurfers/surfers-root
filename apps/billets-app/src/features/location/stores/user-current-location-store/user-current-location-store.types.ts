import type { LatLng } from '@/types/LatLng';

export type UserCurrentLocationType = 'current-location' | 'city-location';

export interface UserCurrentLocationStoreState {
  latitude: number | null;
  longitude: number | null;
  cityName: string | null;
  cityId: string | null;
  type: UserCurrentLocationType | null;
}

export interface UserCurrentLocationStoreAction {
  setUserCurrentLocation: (
    payload: LatLng & {
      cityId: string | null;
      cityName: string | null;
      type: UserCurrentLocationType;
    }
  ) => void;
}

export type UserCurrentLocationStore = UserCurrentLocationStoreState &
  UserCurrentLocationStoreAction;
