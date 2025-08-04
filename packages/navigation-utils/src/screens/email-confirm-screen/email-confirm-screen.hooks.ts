import { useNavigation, useRoute } from '@react-navigation/native';
import type { EmailConfirmScreenProps } from './email-confirm-screen.types';

export const useEmailConfirmScreenNavigation = () => {
  return useNavigation<EmailConfirmScreenProps['navigation']>();
};

export const useEmailConfirmScreenRoute = () => {
  return useRoute<EmailConfirmScreenProps['route']>();
};
