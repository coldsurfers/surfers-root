import React, {useContext} from 'react';
import {palette} from 'fstvllife-design-system';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginStackNavigation from './LoginStackNavigation';
import MainTabNavigation from './MainTabNavigation';
import {AuthContext} from '../lib/contexts/AuthContext';
import {MainStackNavigationParamList} from './MainStackNavigation.types';
import ConcertStackNavigation from './ConcertStackNavigation';

const MainStack = createNativeStackNavigator<MainStackNavigationParamList>();

const MainStackNavigation = () => {
  const {user} = useContext(AuthContext);
  return (
    <MainStack.Navigator
      screenOptions={{
        header: () => null,
        contentStyle: {
          backgroundColor: palette.white,
        },
      }}>
      <MainStack.Screen name="MainTabScreen" component={MainTabNavigation} />
      <MainStack.Screen
        name="ConcertStackScreen"
        component={ConcertStackNavigation}
        options={{
          presentation: 'card',
        }}
      />
      {user ? null : (
        <MainStack.Screen
          name="LoginStackScreen"
          component={LoginStackNavigation}
          options={{presentation: 'fullScreenModal'}}
        />
      )}
    </MainStack.Navigator>
  );
};

export default MainStackNavigation;
