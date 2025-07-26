import { useMeQuery } from '@/features/auth/hooks/useMeQuery';
import { colors } from '@coldsurfers/ocean-road';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useMemo } from 'react';
import { ArtistStackNavigation } from '../artist-stack-navigation';
import { EventStackNavigation } from '../event-stack-navigation/event-stack-navigation';
import { LoginStackNavigation } from '../login-stack-navigation';
import { MainTabNavigation } from '../main-tab-navigation';
import { SettingsStackNavigation } from '../settings-stack-navigation';
import { SubscribedStackNavigation } from '../subscribed-stack-navigation';
import { VenueStackNavigation } from '../venue-stack-navigation';
import type { MainStackNavigationParamList } from './main-stack-navigation.types';

const MainStack = createNativeStackNavigator<MainStackNavigationParamList>();

export const MainStackNavigation = () => {
  const { data: user } = useMeQuery();
  const isLoggedIn = useMemo(() => !!user, [user]);
  return (
    <MainStack.Navigator
      screenOptions={{
        header: () => null,
        contentStyle: {
          backgroundColor: colors.oc.white.value,
        },
      }}
    >
      <MainStack.Screen name="MainTabNavigation" component={MainTabNavigation} />
      <MainStack.Screen
        name="EventStackNavigation"
        component={EventStackNavigation}
        options={{
          presentation: 'card',
          header: () => null,
        }}
      />
      <MainStack.Screen
        name="VenueStackNavigation"
        component={VenueStackNavigation}
        options={{
          presentation: 'card',
        }}
      />
      <MainStack.Screen
        name="ArtistStackNavigation"
        component={ArtistStackNavigation}
        options={{
          presentation: 'card',
        }}
      />
      <MainStack.Screen name="SettingsStackNavigation" component={SettingsStackNavigation} />
      {isLoggedIn ? null : (
        <MainStack.Screen
          name="LoginStackNavigation"
          component={LoginStackNavigation}
          options={{ presentation: 'fullScreenModal' }}
        />
      )}
      {isLoggedIn ? (
        <MainStack.Screen
          name="SubscribedStackNavigation"
          component={SubscribedStackNavigation}
          options={{
            presentation: 'card',
          }}
        />
      ) : null}
    </MainStack.Navigator>
  );
};
