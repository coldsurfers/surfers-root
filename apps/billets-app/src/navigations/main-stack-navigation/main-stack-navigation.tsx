import { AuthContext } from '@/lib'
import { colors } from '@coldsurfers/ocean-road'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useContext } from 'react'
import { ConcertStackNavigation } from '../concert-stack-navigation'
import { LoginStackNavigation } from '../login-stack-navigation'
import { MainTabNavigation } from '../main-tab-navigation'
import { SubscribedStackNavigation } from '../subscribed-stack-navigation'
import { MainStackNavigationParamList } from './main-stack-navigation.types'

const MainStack = createNativeStackNavigator<MainStackNavigationParamList>()

export const MainStackNavigation = () => {
  const { user } = useContext(AuthContext)
  return (
    <MainStack.Navigator
      screenOptions={{
        header: () => null,
        contentStyle: {
          backgroundColor: colors.oc.white.value,
        },
      }}
    >
      <MainStack.Screen name="MainTabScreen" component={MainTabNavigation} />
      <MainStack.Screen
        name="ConcertStackScreen"
        component={ConcertStackNavigation}
        options={{
          presentation: 'card',
        }}
      />
      {user ? null : (
        <MainStack.Screen
          name="LoginStackScreen"
          component={LoginStackNavigation}
          options={{ presentation: 'fullScreenModal' }}
        />
      )}
      {user ? (
        <MainStack.Screen
          name="SubscribedStackScreen"
          component={SubscribedStackNavigation}
          options={{
            presentation: 'card',
          }}
        />
      ) : null}
    </MainStack.Navigator>
  )
}
