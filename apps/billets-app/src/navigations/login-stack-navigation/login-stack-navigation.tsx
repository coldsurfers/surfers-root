import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { Screens } from '../../lib/navigations'
import EmailConfirmScreen from '../../screens/EmailConfirmScreen'
import EmailLoginScreen from '../../screens/EmailLoginScreen'
import EmailSignupScreen from '../../screens/EmailSignupScreen'
import LoginSelectionScreen from '../../screens/LoginSelectionScreen'
import { LoginStackParam } from './login-stack-navigation.types'

const LoginStack = createNativeStackNavigator<LoginStackParam>()

export const LoginStackNavigation = () => {
  return (
    <LoginStack.Navigator
      screenOptions={{
        header: () => null,
      }}
    >
      <LoginStack.Screen name={Screens.LoginSelectionScreen} component={LoginSelectionScreen} />
      <LoginStack.Screen name={Screens.EmailSignupScreen} component={EmailSignupScreen} />
      <LoginStack.Screen name={Screens.EmailLoginScreen} component={EmailLoginScreen} />
      <LoginStack.Screen name={Screens.EmailConfirmScreen} component={EmailConfirmScreen} />
    </LoginStack.Navigator>
  )
}
