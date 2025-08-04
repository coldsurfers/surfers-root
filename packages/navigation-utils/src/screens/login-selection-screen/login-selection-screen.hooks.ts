import { useNavigation, useRoute } from '@react-navigation/native';
import type { LoginSelectionScreenProps } from './login-selection-screen.types';

export const useLoginSelectionScreenNavigation = () => {
  return useNavigation<LoginSelectionScreenProps['navigation']>();
};

export const useLoginSelectionScreenRoute = () => {
  return useRoute<LoginSelectionScreenProps['route']>();
};
