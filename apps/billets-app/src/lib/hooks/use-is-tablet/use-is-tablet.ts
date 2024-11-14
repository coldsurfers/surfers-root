import { useMemo } from 'react'
import deviceInfoModule from 'react-native-device-info'

export function useIsTablet() {
  return useMemo(() => deviceInfoModule.isTablet(), [])
}
