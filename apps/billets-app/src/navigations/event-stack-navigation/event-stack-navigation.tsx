import { ConcertTicketListScreen, EventDetailScreen } from '@/screens'
import { NavigationHeader } from '@/ui'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { EventStackParamList } from './event-stack-navigation.types'

const Stack = createNativeStackNavigator<EventStackParamList>()

export const EventStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}
    >
      <Stack.Screen
        name="EventDetailScreen"
        component={EventDetailScreen}
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
