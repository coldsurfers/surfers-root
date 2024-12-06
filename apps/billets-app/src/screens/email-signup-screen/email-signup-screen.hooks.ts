import { useNavigation, useRoute } from '@react-navigation/native'
import { EmailSignupScreenProp } from './email-signup-screen.types'

export const useEmailSignupScreenNavigation = () => {
  return useNavigation<EmailSignupScreenProp['navigation']>()
}

export const useEmailSignupScreenRoute = () => useRoute<EmailSignupScreenProp['route']>()
