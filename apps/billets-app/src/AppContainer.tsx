import { useAppleAuth, useFirebaseAnalytics, useFirebaseMessaging } from '@/lib'
import { MainStackNavigation, MainStackNavigationParamList } from '@/navigations'
import { LinkingOptions, NavigationContainer, NavigationContainerRef } from '@react-navigation/native'
import React, { useCallback, useEffect, useRef } from 'react'
import { useSendFCMTokenMutation } from './lib/react-query'
import useGetMeQuery from './lib/react-query/queries/useGetMeQuery'

const linking: LinkingOptions<MainStackNavigationParamList> = {
  // @todo: remove fstvllife://
  prefixes: ['billets://', 'fstvllife://'],
  config: {
    initialRouteName: 'MainTabScreen',
    screens: {},
  },
}

const AppContainer = () => {
  const { data: meData } = useGetMeQuery()
  const { logScreenView } = useFirebaseAnalytics()
  const { requestPermission, getFCMToken } = useFirebaseMessaging()
  const { mutate: sendFCMToken } = useSendFCMTokenMutation()

  useAppleAuth()

  useEffect(() => {
    requestPermission()
      .then((authorized) => {
        // @todo: what if user not logged in?
        if (authorized && !!meData) {
          getFCMToken().then((token) => {
            // send fcm token to server
            sendFCMToken(
              {
                fcmToken: token,
              },
              {
                onSuccess: (data) => {
                  console.log(data.data)
                },
              },
            )
          })
        }
      })
      .catch((e) => {
        console.error(e)
      })
  }, [getFCMToken, meData, requestPermission, sendFCMToken])

  const routeNameRef = useRef<string>()
  const navigationRef = useRef<NavigationContainerRef<MainStackNavigationParamList>>(null)

  const getCurrentRoute = useCallback(() => {
    const { current: navigation } = navigationRef
    if (!navigation) {
      return null
    }
    const currentRoute = navigation.getCurrentRoute()
    if (!currentRoute) {
      return null
    }
    const { name: currentRouteName } = currentRoute
    return currentRouteName
  }, [])

  const onReady = useCallback(async () => {
    const currentRouteName = getCurrentRoute()
    if (!currentRouteName) {
      return
    }
    await logScreenView({
      screen_class: currentRouteName,
      screen_name: currentRouteName,
    })
    routeNameRef.current = currentRouteName
  }, [getCurrentRoute, logScreenView])

  const onStateChange = useCallback(async () => {
    const previousRouteName = routeNameRef.current
    const currentRouteName = getCurrentRoute()
    if (!currentRouteName) {
      return
    }
    if (previousRouteName !== currentRouteName) {
      await logScreenView({
        screen_name: currentRouteName,
        screen_class: currentRouteName,
      })
    }
    routeNameRef.current = currentRouteName
  }, [getCurrentRoute, logScreenView])

  return (
    <NavigationContainer ref={navigationRef} linking={linking} onReady={onReady} onStateChange={onStateChange}>
      <MainStackNavigation />
    </NavigationContainer>
  )
}

export default AppContainer
