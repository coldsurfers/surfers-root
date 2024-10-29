import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LocationSelectionScreen from '../screens/LocationSelectionScreen';
import {HomeStackParam} from './HomeStackNavigation.types';

const HomeStack = createNativeStackNavigator<HomeStackParam>();

const HomeStackNavigation = () => {
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

export default HomeStackNavigation;
