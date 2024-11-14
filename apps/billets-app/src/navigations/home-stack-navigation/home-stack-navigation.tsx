import { HomeScreen } from '@/screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import LocationSelectionScreen from '../../screens/LocationSelectionScreen'
import { HomeStackParam } from './home-stack-navigation.types'

const HomeStack = createNativeStackNavigator<HomeStackParam>()

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
  )
}
