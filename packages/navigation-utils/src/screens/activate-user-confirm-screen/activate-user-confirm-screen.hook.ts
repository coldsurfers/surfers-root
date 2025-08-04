import { useNavigation, useRoute } from '@react-navigation/native';
import type { ActivateUserConfirmScreenProps } from './activate-user-confirm-screen.types';

export const useActivateUserConfirmScreenNavigation = () => {
  return useNavigation<ActivateUserConfirmScreenProps['navigation']>();
};

export const useActivateUserConfirmScreenRoute = () => {
  return useRoute<ActivateUserConfirmScreenProps['route']>();
};
