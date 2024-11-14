import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Screens } from '../lib/navigations'
import { EmailConfirmScreenParam } from '../screens/EmailConfirmScreen.types'
import { EmailLoginScreenParam } from '../screens/EmailLoginScreen.type'
import { EmailSignupScreenParam } from '../screens/EmailSignupScreen.types'
import { LoginSelectionScreenParam } from '../screens/LoginSelectionScreen.types'
import { MainStackProp } from './main-stack-navigation'

export type LoginStackParam = {
  [Screens.LoginSelectionScreen]: LoginSelectionScreenParam
  [Screens.EmailSignupScreen]: EmailSignupScreenParam
  [Screens.EmailLoginScreen]: EmailLoginScreenParam
  [Screens.EmailConfirmScreen]: EmailConfirmScreenParam
}

export type LoginStackScreenProp<T extends keyof LoginStackParam> = CompositeScreenProps<
  NativeStackScreenProps<LoginStackParam, T>,
  MainStackProp<'LoginStackScreen'>
>
