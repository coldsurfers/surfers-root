import { zodScreen, ZodScreenParams } from '@/lib'
import { LoginStackScreenProps } from '@/navigations'

export type ActivateUserConfirmScreenParams = ZodScreenParams<typeof zodScreen.ActivateUserConfirmScreen>

export type ActivateUserConfirmScreenProps = LoginStackScreenProps<typeof zodScreen.ActivateUserConfirmScreen.name>
