import { apiClient } from '@/lib/api/openapi-client'
import { MyScreen, SettingsScreen } from '@/screens'
import { NavigationHeader } from '@/ui'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { MyStackParamList } from './my-stack-navigation.types'

const Stack = createNativeStackNavigator<MyStackParamList>()

export const MyStackNavigation = () => {
  const { data: user } = useQuery({
    queryKey: apiClient.user.queryKeys.me,
    queryFn: () => apiClient.user.getMe(),
  })
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
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
    </Stack.Navigator>
  )
}
