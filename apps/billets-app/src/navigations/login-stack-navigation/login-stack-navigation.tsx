import { Screens } from '@/lib'
import {
  ActivateUserConfirmScreen,
  EmailConfirmScreen,
  EmailLoginScreen,
  EmailSignupScreen,
  LoginSelectionScreen,
} from '@/screens'
import { NavigationHeader } from '@/ui'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { LoginStackParam } from './login-stack-navigation.types'

const LoginStack = createNativeStackNavigator<LoginStackParam>()

export const LoginStackNavigation = () => {
  return (
    <LoginStack.Navigator
      screenOptions={{
        header: () => null,
      }}
    >
      <LoginStack.Screen
        name={Screens.LoginSelectionScreen}
        component={LoginSelectionScreen}
        options={{
          header: (props) => (
            <NavigationHeader
              {...props}
              options={{
                ...props.options,
                presentation: 'modal',
              }}
            />
          ),
        }}
      />
      <LoginStack.Screen
        name={Screens.EmailSignupScreen}
        component={EmailSignupScreen}
        options={{
          header: (props) => (
            <NavigationHeader
              {...props}
              options={{
                ...props.options,
                presentation: 'card',
              }}
            />
          ),
        }}
      />
      <LoginStack.Screen
        name={Screens.EmailLoginScreen}
        component={EmailLoginScreen}
        options={{
          header: (props) => (
            <NavigationHeader
              {...props}
              options={{
                ...props.options,
                presentation: 'card',
              }}
            />
          ),
        }}
      />
      <LoginStack.Screen
        name={Screens.EmailConfirmScreen}
        component={EmailConfirmScreen}
        options={{
          header: (props) => (
            <NavigationHeader
              {...props}
              options={{
                ...props.options,
                presentation: 'card',
              }}
            />
          ),
        }}
      />
      <LoginStack.Screen
        name={Screens.ActivateUserConfirmScreen}
        component={ActivateUserConfirmScreen}
        options={{
          header: (props) => (
            <NavigationHeader
              {...props}
              options={{
                ...props.options,
                presentation: 'card',
              }}
            />
          ),
        }}
      />
    </LoginStack.Navigator>
  )
}
