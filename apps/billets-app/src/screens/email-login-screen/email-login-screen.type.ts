import { zodScreen, ZodScreenParams } from '@/lib'
import { LoginStackScreenProps } from '@/navigations'

export type EmailLoginScreenParams = ZodScreenParams<typeof zodScreen.EmailLoginScreen>

export type EmailLoginScreenProps = LoginStackScreenProps<typeof zodScreen.EmailLoginScreen.name>
