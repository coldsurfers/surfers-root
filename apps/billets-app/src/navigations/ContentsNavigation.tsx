import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { StackScreens } from '../lib/navigations'
import ContentsMainScreen from '../screens/ContentsMainScreen'

export type ContentsStackParam = {
  [StackScreens.ContentsStackScreen]: {
    //
  }
}

const Stack = createNativeStackNavigator()

const ContentsNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}
    >
      <Stack.Screen name="ContentsMain" component={ContentsMainScreen} />
    </Stack.Navigator>
  )
}

export default ContentsNavigation
