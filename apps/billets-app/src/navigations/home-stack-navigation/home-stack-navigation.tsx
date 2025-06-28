import { HomeScreen, LocationSelectionScreen } from '@/screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import type { HomeStackParamList } from './home-stack-navigation.types';

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStackNavigation = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          header: () => null,
        }}
      />
      <HomeStack.Screen
        name="LocationSelectionScreen"
        component={LocationSelectionScreen}
        options={{
          header: () => null,
          presentation: 'modal',
        }}
      />
    </HomeStack.Navigator>
  );
};
