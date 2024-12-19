import { UserCurrentLocationStore } from '@/features/location/stores'
import { PersistStorage } from 'zustand/middleware'
import { mmkvKeys } from './constants'
import { mmkvInstance } from './mmkvInstance'

const key = mmkvKeys.currentLocation

export const currentLocationStorage: PersistStorage<UserCurrentLocationStore> = {
  setItem: (name, value) => {
    mmkvInstance.set(key, JSON.stringify(value))
  },
  getItem: () => {
    const value = mmkvInstance.getString(key)
    if (!value) return null
    const json = JSON.parse(value)
    return json
  },
  removeItem: () => {
    mmkvInstance.delete(key)
  },
}
