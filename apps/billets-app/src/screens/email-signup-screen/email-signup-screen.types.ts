import { LoginStackScreenProp } from '@/navigations'

export type EmailSignupScreenParam = {
  type: 'activate-user' | 'email-signup'
}

export type EmailSignupScreenProp = LoginStackScreenProp<'EmailSignupScreen'>
