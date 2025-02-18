import { HomeScreen, LocationSelectionScreen } from '@/screens'
import { EventCategoryScreen } from '@/screens/event-category-screen'
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
        name="LocationSelectionScreen"
        component={LocationSelectionScreen}
        options={{
          header: () => null,
          presentation: 'modal',
        }}
      />
      <HomeStack.Screen
        name="EventCategoryScreen"
        component={EventCategoryScreen}
        options={{
          header: () => null,
          presentation: 'card',
        }}
      />
    </HomeStack.Navigator>
  )
}
