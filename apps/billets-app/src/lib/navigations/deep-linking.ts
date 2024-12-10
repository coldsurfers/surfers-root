import { MainStackNavigationParamList } from '@/navigations'
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging'
import { LinkingOptions } from '@react-navigation/native'
import { Linking } from 'react-native'
import { TabScreens } from './constants'

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
    const concertId = data?.concertId
    if (typeof concertId === 'string') {
      return `${prefix}concert-detail/${concertId}`
    }
    console.warn('Unverified concertId', concertId)
    return null
  }

  console.warn('Missing concertId')
  return null
}

export const deepLinking: LinkingOptions<MainStackNavigationParamList> = {
  prefixes: ['billets://', 'https://billets.coldsurf.io'],
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
