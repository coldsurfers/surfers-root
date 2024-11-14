import { Screens } from '@/lib'
import { ConcertDetailScreen } from '@/screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { ConcertStackParam } from './concert-stack-navigation.types'

const Stack = createNativeStackNavigator<ConcertStackParam>()

export const ConcertStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}
    >
      {/* <Stack.Screen
        name={Screens.ConcertMainScreen}
        component={ConcertMainScreen}
      /> */}
      <Stack.Screen name={Screens.ConcertDetailScreen} component={ConcertDetailScreen} />
      {/* <Stack.Screen
        name={Screens.ConcertListByCategoryScreen}
        component={ConcertListByCategoryScreen}
      /> */}
    </Stack.Navigator>
  )
}
