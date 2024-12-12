import { zodNavigation, ZodNavigationParamList, ZodNavigationParams, zodScreen } from '@/lib'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MainStackScreenProps } from '../main-stack-navigation'

export type LoginStackParams = ZodNavigationParams<typeof zodNavigation.LoginStackNavigation>

export type LoginStackParamList = ZodNavigationParamList<
  [
    typeof zodScreen.LoginSelectionScreen,
    typeof zodScreen.EmailSignupScreen,
    typeof zodScreen.EmailLoginScreen,
    typeof zodScreen.EmailConfirmScreen,
    typeof zodScreen.ActivateUserConfirmScreen,
  ]
>

export type LoginStackScreenProps<T extends keyof LoginStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<LoginStackParamList, T>,
  MainStackScreenProps<typeof zodNavigation.LoginStackNavigation.name>
>
