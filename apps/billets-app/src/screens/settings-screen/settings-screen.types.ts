import { zodScreen } from '@/lib/navigations/constants'
import { ZodScreenParams } from '@/lib/navigations/navigations.types'
import { MyStackScreenProps } from '@/navigations/my-stack-navigation/my-stack-navigation.types'

export type SettingsScreenParams = ZodScreenParams<typeof zodScreen.SettingsScreen>
export type SettingsScreenProps = MyStackScreenProps<'SettingsScreen'>
