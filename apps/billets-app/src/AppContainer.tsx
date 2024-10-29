import {
  LinkingOptions,
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef} from 'react';
import useAppleAuth from './lib/hooks/useAppleAuth';
import useFirebaseAnalytics from './lib/hooks/useFirebaseAnalytics';
import useFirebaseMessaging from './lib/hooks/useFirebaseMessaging';
import MainStackNavigation from './navigations/MainStackNavigation';
import {MainStackNavigationParamList} from './navigations/MainStackNavigation.types';

const linking: LinkingOptions<MainStackNavigationParamList> = {
  prefixes: ['billets://', 'fstvllife://'],
  config: {
    initialRouteName: 'MainTabScreen',
    screens: {},
  },
};

const AppContainer = () => {
  const {logScreenView} = useFirebaseAnalytics();
  const {requestPermission, getFCMToken} = useFirebaseMessaging();

  useAppleAuth();

  useEffect(() => {
    requestPermission()
      .then(authorized => {
        if (authorized) {
          getFCMToken().then(token => {
            // todo: save token to somewhere
            console.log(token);
          });
        }
      })
      .catch(e => {
        console.error(e);
      });
  }, [getFCMToken, requestPermission]);

  const routeNameRef = useRef<string>();
  const navigationRef =
    useRef<NavigationContainerRef<MainStackNavigationParamList>>(null);

  const getCurrentRoute = useCallback(() => {
    const {current: navigation} = navigationRef;
    if (!navigation) {
      return null;
    }
    const currentRoute = navigation.getCurrentRoute();
    if (!currentRoute) {
      return null;
    }
    const {name: currentRouteName} = currentRoute;
    return currentRouteName;
  }, []);

  const onReady = useCallback(async () => {
    const currentRouteName = getCurrentRoute();
    if (!currentRouteName) {
      return;
    }
    await logScreenView({
      screen_class: currentRouteName,
      screen_name: currentRouteName,
    });
    routeNameRef.current = currentRouteName;
  }, [getCurrentRoute, logScreenView]);

  const onStateChange = useCallback(async () => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = getCurrentRoute();
    if (!currentRouteName) {
      return;
    }
    if (previousRouteName !== currentRouteName) {
      await logScreenView({
        screen_name: currentRouteName,
        screen_class: currentRouteName,
      });
    }
    routeNameRef.current = currentRouteName;
  }, [getCurrentRoute, logScreenView]);

  return (
    <NavigationContainer
      ref={navigationRef}
      linking={linking}
      onReady={onReady}
      onStateChange={onStateChange}>
      <MainStackNavigation />
    </NavigationContainer>
  );
};

export default AppContainer;
