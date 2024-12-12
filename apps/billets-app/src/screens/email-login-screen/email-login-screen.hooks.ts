import { useNavigation, useRoute } from '@react-navigation/native'
import { EmailLoginScreenProps } from './email-login-screen.type'

export const useEmailLoginScreenNavigation = () => useNavigation<EmailLoginScreenProps['navigation']>()
export const useEmailLoginScreenRoute = () => useRoute<EmailLoginScreenProps['route']>()
