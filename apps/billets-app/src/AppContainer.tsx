import { TabScreens, useAppleAuth, useFirebaseAnalytics, useFirebaseMessaging } from '@/lib'
import { MainStackNavigation, MainStackNavigationParamList } from '@/navigations'
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging'
import { LinkingOptions, NavigationContainer, NavigationContainerRef } from '@react-navigation/native'
import React, { useCallback, useEffect, useRef } from 'react'
import { ActivityIndicator, Linking } from 'react-native'
import { useSendFCMTokenMutation } from './lib/react-query'

const NAVIGATION_IDS = ['home', 'my', 'search', 'concert-detail']

function buildDeepLinkFromNotificationData(data: FirebaseMessagingTypes.RemoteMessage['data']): string | null {
  const navigationId = data?.navigationId
  if (!navigationId || typeof navigationId !== 'string') {
    console.warn('Unverified navigationId', navigationId)
    return null
  }
  if (!NAVIGATION_IDS.includes(navigationId)) {
    console.warn('Unverified navigationId', navigationId)
    return null
  }
  const prefix = 'billets://'
  if (navigationId === 'home') {
    return `${prefix}home`
  }
  if (navigationId === 'my') {
    return `${prefix}my`
  }
  if (navigationId === 'search') {
    return `${prefix}search`
  }
  if (navigationId === 'concert-detail') {
    return `${prefix}concert-detail`
  }
  const concertId = data?.concertId
  if (typeof concertId === 'string') {
    return `${prefix}concert-detail/${concertId}`
  }
  console.warn('Missing concertId')
  return null
}

const linking: LinkingOptions<MainStackNavigationParamList> = {
  // @todo: remove fstvllife://
  prefixes: ['billets://', 'fstvllife://'],
  config: {
    initialRouteName: TabScreens.MainTabScreen,
    screens: {
      MainTabScreen: {
        path: '/',
        screens: {
          HomeStackScreen: {
            path: '/home',
          },
          MyStackScreen: {
            path: '/my',
          },
          SearchStackScreen: {
            path: '/search',
          },
        },
      },
      ConcertStackScreen: {
        screens: {
          ConcertDetailScreen: {
            path: '/concert-detail/:concertId',
          },
        },
      },
    },
  },
  async getInitialURL() {
    const url = await Linking.getInitialURL()
    if (typeof url === 'string') {
      return url
    }
    //getInitialNotification: When the application is opened from a quit state.
    const message = await messaging().getInitialNotification()
    const deeplinkURL = buildDeepLinkFromNotificationData(message?.data)
    if (typeof deeplinkURL === 'string') {
      return deeplinkURL
    }
  },
  subscribe(listener: (url: string) => void) {
    const onReceiveURL = ({ url }: { url: string }) => listener(url)

    // Listen to incoming links from deep linking
    const linkingSubscription = Linking.addEventListener('url', onReceiveURL)

    //onNotificationOpenedApp: When the application is running, but in the background.
    const unsubscribe = messaging().onNotificationOpenedApp((remoteMessage) => {
      const url = buildDeepLinkFromNotificationData(remoteMessage.data)
      if (typeof url === 'string') {
        listener(url)
      }
    })

    return () => {
      linkingSubscription.remove()
      unsubscribe()
    }
  },
}

const AppContainer = () => {
  const { logScreenView } = useFirebaseAnalytics()
  const { requestPermission, getFCMToken, subscribeTopic } = useFirebaseMessaging()
  const { mutate: sendFCMToken } = useSendFCMTokenMutation()

  useAppleAuth()

  useEffect(() => {
    // 앱 초기 진입 시 푸시 알림 권한 설정 및 fcm token 설정
    requestPermission()
      .then((authorized) => {
        if (authorized) {
          subscribeTopic('new-concert')
          getFCMToken().then((token) => {
            // send fcm token to server
            sendFCMToken({
              fcmToken: token,
            })
          })
        }
      })
      .catch((e) => {
        console.error(e)
      })
  }, [getFCMToken, requestPermission, sendFCMToken, subscribeTopic])

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
    <NavigationContainer
      ref={navigationRef}
      linking={linking}
      onReady={onReady}
      onStateChange={onStateChange}
      fallback={<ActivityIndicator animating />}
    >
      <MainStackNavigation />
    </NavigationContainer>
  )
}

export default AppContainer
