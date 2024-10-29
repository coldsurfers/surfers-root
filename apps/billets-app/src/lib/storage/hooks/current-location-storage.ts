import {UserCurrentLocationStore} from '../../stores/userCurrentLocationStore';
import {mmkvKeys} from '../constants';
import {mmkvInstance} from '../mmkvInstance';
import {PersistStorage} from 'zustand/middleware';

const key = mmkvKeys.currentLocation;

export const currentLocationStorage: PersistStorage<UserCurrentLocationStore> =
  {
    setItem: (name, value) => {
      mmkvInstance.set(key, JSON.stringify(value));
    },
    getItem: () => {
      const value = mmkvInstance.getString(key);
      if (!value) return null;
      const json = JSON.parse(value);
      return json;
    },
    removeItem: () => {
      mmkvInstance.delete(key);
    },
  };
