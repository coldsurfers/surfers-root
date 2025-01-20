import { useNavigation, useRoute } from '@react-navigation/native'
import { SettingsScreenProps } from './settings-screen.types'

export const useSettingsScreenNavigation = () => {
  return useNavigation<SettingsScreenProps['navigation']>()
}
export const useSettingsScreenRoute = () => {
  return useRoute<SettingsScreenProps['route']>()
}
