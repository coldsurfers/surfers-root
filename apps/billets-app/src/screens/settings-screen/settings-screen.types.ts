import { zodScreen } from '@/lib/navigations/constants'
import { ZodScreenParams } from '@/lib/navigations/navigations.types'
import { SettingsStackScreenProps } from '@/navigations/settings-stack-navigation/settings-stack-navigation.types'

export type SettingsScreenParams = ZodScreenParams<typeof zodScreen.SettingsScreen>
export type SettingsScreenProps = SettingsStackScreenProps<'SettingsScreen'>
