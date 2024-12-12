import { ConcertDetailScreen, ConcertTicketListScreen } from '@/screens'
import { NavigationHeader } from '@/ui'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { ConcertStackParamList } from './concert-stack-navigation.types'

const Stack = createNativeStackNavigator<ConcertStackParamList>()

export const ConcertStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}
    >
      <Stack.Screen
        name="ConcertDetailScreen"
        component={ConcertDetailScreen}
        options={{
          header: (props) => (
            <NavigationHeader
              {...props}
              options={{
                ...props.options,
                presentation: 'card',
                headerTransparent: true,
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="ConcertTicketListScreen"
        component={ConcertTicketListScreen}
        options={{
          animation: 'fade',
          presentation: 'containedModal',
          header: (props) => (
            <NavigationHeader
              {...props}
              options={{
                ...props.options,
                presentation: 'fullScreenModal',
                headerTransparent: true,
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  )
}
