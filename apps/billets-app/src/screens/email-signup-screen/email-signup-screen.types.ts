import { zodScreen, ZodScreenParams } from '@/lib'
import { LoginStackScreenProps } from '@/navigations'

export type EmailSignupScreenParams = ZodScreenParams<typeof zodScreen.EmailSignupScreen>

export type EmailSignupScreenProps = LoginStackScreenProps<typeof zodScreen.EmailSignupScreen.name>
