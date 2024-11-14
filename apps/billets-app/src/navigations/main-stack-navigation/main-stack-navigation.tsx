import { AuthContext } from '@/lib/contexts/AuthContext'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { palette } from 'fstvllife-design-system'
import React, { useContext } from 'react'
import ConcertStackNavigation from '../ConcertStackNavigation'
import LoginStackNavigation from '../LoginStackNavigation'
import MainTabNavigation from '../MainTabNavigation'
import { MainStackNavigationParamList } from './main-stack-navigation.types'

const MainStack = createNativeStackNavigator<MainStackNavigationParamList>()

export const MainStackNavigation = () => {
  const { user } = useContext(AuthContext)
  return (
    <MainStack.Navigator
      screenOptions={{
        header: () => null,
        contentStyle: {
          backgroundColor: palette.white,
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
    </MainStack.Navigator>
  )
}
