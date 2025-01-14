import { apiClient } from '@/lib/api/openapi-client'
import { colors } from '@coldsurfers/ocean-road'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { ArtistStackNavigation } from '../artist-stack-navigation'
import { ConcertStackNavigation } from '../concert-stack-navigation'
import { LoginStackNavigation } from '../login-stack-navigation'
import { MainTabNavigation } from '../main-tab-navigation'
import { SubscribedStackNavigation } from '../subscribed-stack-navigation'
import { VenueStackNavigation } from '../venue-stack-navigation'
import { MainStackNavigationParamList } from './main-stack-navigation.types'

const MainStack = createNativeStackNavigator<MainStackNavigationParamList>()

export const MainStackNavigation = () => {
  const { data: user } = useQuery({
    queryKey: apiClient.user.queryKeys.me,
    queryFn: () => apiClient.user.getMe(),
  })
  return (
    <MainStack.Navigator
      screenOptions={{
        header: () => null,
        contentStyle: {
          backgroundColor: colors.oc.white.value,
        },
      }}
    >
      <MainStack.Screen name="MainTabNavigation" component={MainTabNavigation} />
      <MainStack.Screen
        name="ConcertStackNavigation"
        component={ConcertStackNavigation}
        options={{
          presentation: 'card',
        }}
      />
      <MainStack.Screen
        name="VenueStackNavigation"
        component={VenueStackNavigation}
        options={{
          presentation: 'card',
        }}
      />
      <MainStack.Screen
        name="ArtistStackNavigation"
        component={ArtistStackNavigation}
        options={{
          presentation: 'card',
        }}
      />
      {user ? null : (
        <MainStack.Screen
          name="LoginStackNavigation"
          component={LoginStackNavigation}
          options={{ presentation: 'fullScreenModal' }}
        />
      )}
      {user ? (
        <MainStack.Screen
          name="SubscribedStackNavigation"
          component={SubscribedStackNavigation}
          options={{
            presentation: 'card',
          }}
        />
      ) : null}
    </MainStack.Navigator>
  )
}
