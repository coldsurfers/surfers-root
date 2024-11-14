import { useNavigation, useRoute } from '@react-navigation/native'
import { EmailLoginScreenProp } from './email-login-screen.type'

export const useEmailLoginScreenNavigation = () => useNavigation<EmailLoginScreenProp['navigation']>()
export const useEmailLoginScreenRoute = () => useRoute<EmailLoginScreenProp['route']>()
