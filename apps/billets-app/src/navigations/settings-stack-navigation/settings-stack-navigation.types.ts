import { zodNavigation, zodScreen } from '@/lib/navigations/constants'
import { ZodNavigationParamList, ZodNavigationParams } from '@/lib/navigations/navigations.types'
import { SettingsScreenParams } from '@/screens/settings-screen/settings-screen.types'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MainStackScreenProps } from '../main-stack-navigation'

export type SettingsStackParams = ZodNavigationParams<typeof zodNavigation.SettingsStackNavigation>

export type SettingsStackParamList = ZodNavigationParamList<{
  [zodScreen.SettingsScreen.name]: SettingsScreenParams
}>

export type SettingsStackScreenProps<T extends keyof SettingsStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<SettingsStackParamList, T>,
  MainStackScreenProps<typeof zodNavigation.SettingsStackNavigation.name>
>
