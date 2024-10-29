import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CommunityMainScreen from '../screens/CommunityMainScreen';
import {StackScreens} from '../lib/navigations';

export type CommunityStackParam = {
  [StackScreens.CommunityStackScreen]: {};
};

const Stack = createNativeStackNavigator();

const CommunityNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}>
      <Stack.Screen name="CommunityMain" component={CommunityMainScreen} />
    </Stack.Navigator>
  );
};

export default CommunityNavigation;
