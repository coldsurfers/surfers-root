import { useNavigation, useRoute } from '@react-navigation/native';
import type { EmailSignupScreenProps } from './email-signup-screen.types';

export const useEmailSignupScreenNavigation = () => {
  return useNavigation<EmailSignupScreenProps['navigation']>();
};

export const useEmailSignupScreenRoute = () => useRoute<EmailSignupScreenProps['route']>();
