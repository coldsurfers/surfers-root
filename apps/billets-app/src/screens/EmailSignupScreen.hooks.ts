import { useNavigation } from '@react-navigation/native'
import { EmailSignupScreenProp } from './EmailSignupScreen.types'

export const useEmailSignupScreenNavigation = () => {
  return useNavigation<EmailSignupScreenProp['navigation']>()
}
