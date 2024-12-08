import { Screens } from '@/lib'
import {
  ActivateUserConfirmScreenParam,
  EmailConfirmScreenParam,
  EmailLoginScreenParam,
  EmailSignupScreenParam,
  LoginSelectionScreenParam,
} from '@/screens'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MainStackProp } from '../main-stack-navigation'

export type LoginStackParam = {
  [Screens.LoginSelectionScreen]: LoginSelectionScreenParam
  [Screens.EmailSignupScreen]: EmailSignupScreenParam
  [Screens.EmailLoginScreen]: EmailLoginScreenParam
  [Screens.EmailConfirmScreen]: EmailConfirmScreenParam
  [Screens.ActivateUserConfirmScreen]: ActivateUserConfirmScreenParam
}

export type LoginStackScreenProp<T extends keyof LoginStackParam> = CompositeScreenProps<
  NativeStackScreenProps<LoginStackParam, T>,
  MainStackProp<'LoginStackScreen'>
>
