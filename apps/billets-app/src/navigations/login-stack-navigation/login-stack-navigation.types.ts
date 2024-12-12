import { zodNavigation, ZodNavigationParamList, ZodNavigationParams, zodScreen } from '@/lib'
import {
  ActivateUserConfirmScreenParams,
  EmailConfirmScreenParams,
  EmailLoginScreenParams,
  EmailSignupScreenParams,
  LoginSelectionScreenParams,
} from '@/screens'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MainStackScreenProps } from '../main-stack-navigation'

export type LoginStackParams = ZodNavigationParams<typeof zodNavigation.LoginStackNavigation>

export type LoginStackParamList = ZodNavigationParamList<{
  [zodScreen.LoginSelectionScreen.name]: LoginSelectionScreenParams
  [zodScreen.EmailSignupScreen.name]: EmailSignupScreenParams
  [zodScreen.EmailLoginScreen.name]: EmailLoginScreenParams
  [zodScreen.EmailConfirmScreen.name]: EmailConfirmScreenParams
  [zodScreen.ActivateUserConfirmScreen.name]: ActivateUserConfirmScreenParams
}>

export type LoginStackScreenProps<T extends keyof LoginStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<LoginStackParamList, T>,
  MainStackScreenProps<typeof zodNavigation.LoginStackNavigation.name>
>
