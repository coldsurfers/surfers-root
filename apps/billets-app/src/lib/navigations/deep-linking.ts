import type { MainStackNavigationParamList } from '@/navigations';
import messaging, { type FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import type { LinkingOptions } from '@react-navigation/native';
import { Linking } from 'react-native';

const NAVIGATION_IDS = ['home', 'my', 'search', 'event-detail', 'artist-detail', 'venue-detail'];

function buildDeepLinkFromNotificationData(
  data: FirebaseMessagingTypes.RemoteMessage['data']
): string | null {
  const navigationId = data?.navigationId;
  if (!navigationId || typeof navigationId !== 'string') {
    console.warn('Unverified navigationId', navigationId);
    return null;
  }
  if (!NAVIGATION_IDS.includes(navigationId)) {
    console.warn('Unverified navigationId', navigationId);
    return null;
  }
  const prefix = 'billets://';
  if (navigationId === 'home') {
    return `${prefix}home`;
  }
  if (navigationId === 'my') {
    return `${prefix}my`;
  }
  if (navigationId === 'search') {
    return `${prefix}search`;
  }
  if (navigationId === 'event-detail') {
    const eventId = data?.eventId;
    if (typeof eventId === 'string') {
      return `${prefix}event/${eventId}`;
    }
    console.warn('Unverified eventId', eventId);
    return null;
  }
  if (navigationId === 'artist-detail') {
    const artistId = data?.artistId;
    if (typeof artistId === 'string') {
      return `${prefix}artist/${artistId}`;
    }
    console.warn('Unverified artistId', artistId);
    return null;
  }
  if (navigationId === 'venue-detail') {
    const venueId = data?.venueId;
    if (typeof venueId === 'string') {
      return `${prefix}venue/${venueId}`;
    }
    console.warn('Unverified venueId', venueId);
    return null;
  }

  console.warn('Missing concertId');
  return null;
}

export const deepLinking: LinkingOptions<MainStackNavigationParamList> = {
  prefixes: ['billets://', 'https://billets.coldsurf.io'],
  config: {
    initialRouteName: 'MainTabNavigation',
    screens: {
      MainTabNavigation: {
        path: '/',
        screens: {
          HomeStackNavigation: {
            path: '/home',
          },
          MyStackNavigation: {
            path: '/my',
          },
          SearchStackNavigation: {
            path: '/search',
          },
        },
      },
      EventStackNavigation: {
        screens: {
          EventDetailScreen: {
            path: '/event/:eventId',
          },
        },
      },
      ArtistStackNavigation: {
        screens: {
          ArtistDetailScreen: {
            path: '/artist/:artistId',
          },
        },
      },
      VenueStackNavigation: {
        screens: {
          VenueDetailScreen: {
            path: '/venue/:venueId',
          },
        },
      },
    },
  },
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (typeof url === 'string') {
      return url;
    }
    //getInitialNotification: When the application is opened from a quit state.
    const message = await messaging().getInitialNotification();
    const deeplinkURL = buildDeepLinkFromNotificationData(message?.data);
    if (typeof deeplinkURL === 'string') {
      return deeplinkURL;
    }
  },
  subscribe(listener: (url: string) => void) {
    const onReceiveURL = ({ url }: { url: string }) => listener(url);

    // Listen to incoming links from deep linking
    const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

    //onNotificationOpenedApp: When the application is running, but in the background.
    const unsubscribe = messaging().onNotificationOpenedApp((remoteMessage) => {
      const url = buildDeepLinkFromNotificationData(remoteMessage.data);
      if (typeof url === 'string') {
        listener(url);
      }
    });

    return () => {
      linkingSubscription.remove();
      unsubscribe();
    };
  },
};
