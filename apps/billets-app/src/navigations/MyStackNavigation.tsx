import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MyScreen from '../screens/MyScreen'
import ArtistAddScreen from '../screens/ArtistAddScreen'
import { MyStackParam } from './MyStackNavigation.types'

const Stack = createNativeStackNavigator<MyStackParam>()

const MyStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}
    >
      <Stack.Screen name="MyScreen" component={MyScreen} />
      <Stack.Screen name="ArtistAddScreen" component={ArtistAddScreen} />
    </Stack.Navigator>
  )
}

export default MyStackNavigation
