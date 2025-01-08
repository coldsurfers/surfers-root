import { useMMKVString } from 'react-native-mmkv'
import { mmkvKeys } from './constants'
import { mmkvInstance } from './mmkvInstance'

export const colorSchemeStorage = {
  set: (value: 'light' | 'dark') => {
    mmkvInstance.set(mmkvKeys.colorScheme, value)
  },
  get: () => {
    return mmkvInstance.getString(mmkvKeys.colorScheme)
  },
}

export const useColorSchemeStorage = () => {
  return useMMKVString(mmkvKeys.colorScheme, mmkvInstance)
}
