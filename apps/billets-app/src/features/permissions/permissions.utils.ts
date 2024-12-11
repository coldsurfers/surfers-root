import { Platform } from 'react-native'
import { check, PERMISSIONS, request } from 'react-native-permissions'

export const permissionsUtils = {
  checkLocationPermission: async () => {
    const permission =
      Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    const result = await check(permission)
    return result
  },
  requestLocationPermission: async (options?: { iOSAlways: boolean }) => {
    const permission =
      Platform.OS === 'ios'
        ? options?.iOSAlways
          ? PERMISSIONS.IOS.LOCATION_ALWAYS
          : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    const result = await request(permission)
    return result
  },
  checkAppTrackingPermission: async () => {
    if (Platform.OS !== 'ios') {
      return
    }
    const result = await check(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY)
    return result
  },
  requestAppTrackingPermission: async () => {
    if (Platform.OS !== 'ios') {
      return
    }
    const result = await request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY)
    return result
  },
}
