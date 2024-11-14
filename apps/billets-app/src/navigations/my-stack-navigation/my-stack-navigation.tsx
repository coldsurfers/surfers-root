import { MyScreen } from '@/screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { MyStackParam } from './my-stack-navigation.types'

const Stack = createNativeStackNavigator<MyStackParam>()

export const MyStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}
    >
      <Stack.Screen name="MyScreen" component={MyScreen} />
    </Stack.Navigator>
  )
}
