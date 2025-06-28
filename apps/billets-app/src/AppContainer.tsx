import { deepLinking, useAppleAuth, useFirebaseAnalytics, useFirebaseMessaging } from '@/lib';
import { MainStackNavigation, type MainStackNavigationParamList } from '@/navigations';
import type { OpenApiError, components } from '@coldsurfers/api-sdk';
import { NavigationContainer, type NavigationContainerRef } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { ActivityIndicator } from 'react-native';
import BootSplash from 'react-native-bootsplash';
import { GlobalModal } from './features';
import { apiClient } from './lib/api/openapi-client';
const AppContainer = () => {
  const { logScreenView } = useFirebaseAnalytics();
  const { requestPermission, getFCMToken, subscribeTopic } = useFirebaseMessaging();
  const { mutate: mutateSaveFcmToken } = useMutation<
    components['schemas']['FCMTokenDTOSchema'],
    OpenApiError,
    string
  >({
    mutationFn: (fcmToken) => apiClient.fcm.saveFcmToken(fcmToken),
  });

  useAppleAuth();

  useLayoutEffect(() => {
    BootSplash.hide({ fade: true });
  }, []);

  useEffect(() => {
    // 앱 초기 진입 시 푸시 알림 권한 설정 및 fcm token 설정
    requestPermission()
      .then((authorized) => {
        if (authorized) {
          subscribeTopic('new-concert');
          getFCMToken().then((token) => {
            // send fcm token to server
            mutateSaveFcmToken(token);
          });
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }, [getFCMToken, requestPermission, mutateSaveFcmToken, subscribeTopic]);

  const routeNameRef = useRef<string>();
  const navigationRef = useRef<NavigationContainerRef<MainStackNavigationParamList>>(null);

  const getCurrentRoute = useCallback(() => {
    const { current: navigation } = navigationRef;
    if (!navigation) {
      return null;
    }
    const currentRoute = navigation.getCurrentRoute();
    if (!currentRoute) {
      return null;
    }
    const { name: currentRouteName } = currentRoute;
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
    <>
      <NavigationContainer
        ref={navigationRef}
        linking={deepLinking}
        onReady={onReady}
        onStateChange={onStateChange}
        fallback={<ActivityIndicator animating />}
      >
        <MainStackNavigation />
      </NavigationContainer>
      <GlobalModal />
    </>
  );
};

export default AppContainer;
