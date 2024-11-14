import { useNavigation, useRoute } from '@react-navigation/native'
import { LoginSelectionScreenProp } from './login-selection-screen.types'

export const useLoginSelectionScreenNavigation = () => {
  return useNavigation<LoginSelectionScreenProp['navigation']>()
}

export const useLoginSelectionScreenRoute = () => {
  return useRoute<LoginSelectionScreenProp['route']>()
}
