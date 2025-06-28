import type { zodScreen } from '@/lib';
import { getEventCategoryUIName } from '@/lib/utils.event-category';
import { ConcertTicketListScreen, EventDetailScreen } from '@/screens';
import { EventCategoryScreen } from '@/screens/event-category-screen';
import { NavigationHeader } from '@/ui';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import type { z } from 'zod';
import type { EventStackParamList } from './event-stack-navigation.types';

const Stack = createNativeStackNavigator<EventStackParamList>();

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
              absolutePosition
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
      <Stack.Screen
        name="EventCategoryScreen"
        component={EventCategoryScreen}
        options={{
          animation: 'fade',
          presentation: 'card',
          header: (props) => (
            <NavigationHeader
              {...props}
              options={{
                ...props.options,
                presentation: 'card',
                title: getEventCategoryUIName(
                  (props.route.params as z.infer<typeof zodScreen.EventCategoryScreen.params>)[
                    // biome-ignore lint/complexity/useLiteralKeys: <explanation>
                    'eventCategory'
                  ]
                ),
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};
