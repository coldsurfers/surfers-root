import { useNavigation } from '@react-navigation/native';
import type { LocationSelectionScreenProp } from './location-selection-screen.types';

export const useLocationSelectionScreenNavigation = () =>
  useNavigation<LocationSelectionScreenProp['navigation']>();

export const useLocationSelectionScreenRoute = () =>
  useNavigation<LocationSelectionScreenProp['route']>();
