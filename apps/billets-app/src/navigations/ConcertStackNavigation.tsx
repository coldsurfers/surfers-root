import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ConcertDetailScreen from '../screens/ConcertDetailScreen';
import {Screens} from '../lib/navigations';
import {ConcertStackParam} from './ConcertStackNavigation.types';

const Stack = createNativeStackNavigator<ConcertStackParam>();

const ConcertStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}>
      {/* <Stack.Screen
        name={Screens.ConcertMainScreen}
        component={ConcertMainScreen}
      /> */}
      <Stack.Screen
        name={Screens.ConcertDetailScreen}
        component={ConcertDetailScreen}
      />
      {/* <Stack.Screen
        name={Screens.ConcertListByCategoryScreen}
        component={ConcertListByCategoryScreen}
      /> */}
    </Stack.Navigator>
  );
};

export default ConcertStackNavigation;
