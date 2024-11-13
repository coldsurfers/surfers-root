import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { StackScreens } from '../lib/navigations'
import CommunityMainScreen from '../screens/CommunityMainScreen'

export type CommunityStackParam = {
  [StackScreens.CommunityStackScreen]: {
    //
  }
}

const Stack = createNativeStackNavigator()

const CommunityNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}
    >
      <Stack.Screen name="CommunityMain" component={CommunityMainScreen} />
    </Stack.Navigator>
  )
}

export default CommunityNavigation
