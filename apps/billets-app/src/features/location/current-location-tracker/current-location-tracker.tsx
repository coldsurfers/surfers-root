import { permissionsUtils } from '@/features/permissions/permissions.utils'
import { useCallback, useEffect } from 'react'
import { AppState } from 'react-native'
import geolocationUtils from '../../../lib/geolocationUtils'
import { useUserCurrentLocationStore } from '../stores'

export const CurrentLocationTracker = () => {
  const setUserCurrentLocation = useUserCurrentLocationStore((state) => state.setUserCurrentLocation)

  const initializeLocation = useCallback(async () => {
    try {
      const data = await geolocationUtils.getCurrentLocation()
      const { latitude, longitude } = data.coords
      setUserCurrentLocation({
        latitude,
        longitude,
        type: 'current-location',
        cityName: null,
      })
    } catch (e) {
      console.error('failed to get current location', e)
    }
  }, [setUserCurrentLocation])

  useEffect(() => {
    permissionsUtils.checkLocationPermission().then((result) => {
      if (result === 'granted') {
        initializeLocation()
      } else {
        permissionsUtils.requestLocationPermission().then((result) => {
          if (result === 'granted') {
            initializeLocation()
          }
        })
      }
    })
  }, [initializeLocation])

  useEffect(() => {
    const listener = AppState.addEventListener('change', (event) => {
      if (event === 'active') {
        console.log('foreground')
        initializeLocation()
      }
    })

    return listener.remove
  }, [initializeLocation])

  return null
}
