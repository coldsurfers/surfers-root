import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { palette } from 'fstvllife-design-system'
import React, { useContext } from 'react'
import { AuthContext } from '../lib/contexts/AuthContext'
import ConcertStackNavigation from './ConcertStackNavigation'
import LoginStackNavigation from './LoginStackNavigation'
import { MainStackNavigationParamList } from './MainStackNavigation.types'
import MainTabNavigation from './MainTabNavigation'

const MainStack = createNativeStackNavigator<MainStackNavigationParamList>()

const MainStackNavigation = () => {
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

export default MainStackNavigation
