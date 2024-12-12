import { useNavigation, useRoute } from '@react-navigation/native'
import { LoginSelectionScreenProps } from './login-selection-screen.types'

export const useLoginSelectionScreenNavigation = () => {
  return useNavigation<LoginSelectionScreenProps['navigation']>()
}

export const useLoginSelectionScreenRoute = () => {
  return useRoute<LoginSelectionScreenProps['route']>()
}
