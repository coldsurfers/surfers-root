import { HomeScreen, LocationSelectionScreen } from '@/screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { HomeStackParamList } from './home-stack-navigation.types'

const HomeStack = createNativeStackNavigator<HomeStackParamList>()

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
        name="HomeScreen"
        component={LocationSelectionScreen}
        options={{
          header: () => null,
          presentation: 'modal',
        }}
      />
    </HomeStack.Navigator>
  )
}
