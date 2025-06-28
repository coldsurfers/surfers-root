import {
  ActivateUserConfirmScreen,
  EmailConfirmScreen,
  EmailLoginScreen,
  EmailSignupScreen,
  LoginSelectionScreen,
} from '@/screens';
import { NavigationHeader } from '@/ui';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import type { LoginStackParamList } from './login-stack-navigation.types';

const LoginStack = createNativeStackNavigator<LoginStackParamList>();

export const LoginStackNavigation = () => {
  return (
    <LoginStack.Navigator
      screenOptions={{
        header: () => null,
      }}
    >
      <LoginStack.Screen
        name="LoginSelectionScreen"
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
        name="EmailSignupScreen"
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
        name="EmailLoginScreen"
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
        name="EmailConfirmScreen"
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
        name="ActivateUserConfirmScreen"
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
  );
};
