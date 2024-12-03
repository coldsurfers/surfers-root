import { useNavigation, useRoute } from '@react-navigation/native'
import { ActivateUserConfirmScreenProp } from './activate-user-confirm-screen.types'

export const useActivateUserConfirmScreenNavigation = () => {
  return useNavigation<ActivateUserConfirmScreenProp['navigation']>()
}

export const useActivateUserConfirmScreenRoute = () => {
  return useRoute<ActivateUserConfirmScreenProp['route']>()
}
