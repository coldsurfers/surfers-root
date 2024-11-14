import { Screens } from '@/lib'
import { EmailLoginScreenParam } from '@/screens'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { EmailConfirmScreenParam } from '../../screens/email-confirm-screen/email-confirm-screen.types'
import { EmailSignupScreenParam } from '../../screens/EmailSignupScreen.types'
import { LoginSelectionScreenParam } from '../../screens/login-selection-screen/login-selection-screen.types'
import { MainStackProp } from '../main-stack-navigation'

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
