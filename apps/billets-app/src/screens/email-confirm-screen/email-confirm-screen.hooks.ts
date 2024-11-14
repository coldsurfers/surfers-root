import { useNavigation, useRoute } from '@react-navigation/native'
import { EmailConfirmScreenProp } from './email-confirm-screen.types'

export const useEmailConfirmScreenNavigation = () => {
  return useNavigation<EmailConfirmScreenProp['navigation']>()
}

export const useEmailConfirmScreenRoute = () => {
  return useRoute<EmailConfirmScreenProp['route']>()
}
