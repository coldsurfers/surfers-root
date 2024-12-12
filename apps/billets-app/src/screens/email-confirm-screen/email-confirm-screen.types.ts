import { zodScreen, ZodScreenParams } from '@/lib'
import { LoginStackScreenProps } from '@/navigations'

export type EmailConfirmScreenParams = ZodScreenParams<typeof zodScreen.EmailConfirmScreen>

export type EmailConfirmScreenProps = LoginStackScreenProps<typeof zodScreen.EmailConfirmScreen.name>
