import { LoginStackScreenProp } from '../navigations/login-stack-navigation/login-stack-navigation.types'

export type EmailConfirmScreenParam = {
  email: string
}

export type EmailConfirmScreenProp = LoginStackScreenProp<'EmailConfirmScreen'>
