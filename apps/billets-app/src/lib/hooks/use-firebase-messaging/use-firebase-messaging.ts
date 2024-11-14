import messaging from '@react-native-firebase/messaging'
import { useCallback, useEffect, useMemo } from 'react'

export function useFirebaseMessaging() {
  const requestPermission = useCallback(async () => {
    const status = await messaging().requestPermission()
    return status === messaging.AuthorizationStatus.PROVISIONAL || status === messaging.AuthorizationStatus.AUTHORIZED
  }, [])

  const getFCMToken = useCallback(async () => {
    const fcmToken = await messaging().getToken()
    return fcmToken
  }, [])

  useEffect(() => {
    // foreground
    const unsubscribe = messaging().onMessage((message) => {
      console.log(message)
    })

    // When the application is running, but in the background.
    messaging().onNotificationOpenedApp((message) => {
      console.log('Notification caused app to open from background state:', message)
    })

    // When the application is opened from a quit state.
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log('Notification caused app to open from quit state:', remoteMessage.notification)
        }
      })

    return () => unsubscribe()
  }, [])

  return useMemo(
    () => ({
      requestPermission,
      getFCMToken,
    }),
    [requestPermission, getFCMToken],
  )
}
