import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginSelectionScreen from '../screens/LoginSelectionScreen'
import { Screens } from '../lib/navigations'
import EmailSignupScreen from '../screens/EmailSignupScreen'
import EmailLoginScreen from '../screens/EmailLoginScreen'
import EmailConfirmScreen from '../screens/EmailConfirmScreen'
import { LoginStackParam } from './LoginStackNavigation.types'

const LoginStack = createNativeStackNavigator<LoginStackParam>()

const LoginStackNavigation = () => {
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

export default LoginStackNavigation
