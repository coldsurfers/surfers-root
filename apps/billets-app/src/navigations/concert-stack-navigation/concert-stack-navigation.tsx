import { Screens } from '@/lib'
import { ConcertDetailScreen, ConcertTicketListScreen } from '@/screens'
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
      <Stack.Screen name={Screens.ConcertDetailScreen} component={ConcertDetailScreen} />
      <Stack.Screen
        name={Screens.ConcertTicketListScreen}
        component={ConcertTicketListScreen}
        options={{
          animation: 'fade',
          presentation: 'fullScreenModal',
        }}
      />
    </Stack.Navigator>
  )
}
