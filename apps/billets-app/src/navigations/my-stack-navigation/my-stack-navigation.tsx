import { AuthContext } from '@/lib'
import { MyScreen } from '@/screens'
import { NavigationHeader } from '@/ui'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useContext } from 'react'
import { MyStackParam } from './my-stack-navigation.types'

const Stack = createNativeStackNavigator<MyStackParam>()

export const MyStackNavigation = () => {
  const { user } = useContext(AuthContext)
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}
    >
      <Stack.Screen
        name="MyScreen"
        component={MyScreen}
        options={{
          header: (props) => {
            if (!user) {
              return null
            }
            return (
              <NavigationHeader
                {...props}
                options={{
                  ...props.options,
                  title: '프로필',
                  headerBackVisible: false,
                }}
              />
            )
          },
        }}
      />
    </Stack.Navigator>
  )
}
