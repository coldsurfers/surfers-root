import {useNavigation} from '@react-navigation/native';
import {LocationSelectionScreenProp} from './LocationSelectionScreen.types';

export const useLocationSelectionScreenNavigation = () =>
  useNavigation<LocationSelectionScreenProp['navigation']>();

export const useLocationSelectionScreenRoute = () =>
  useNavigation<LocationSelectionScreenProp['route']>();
