import {useNavigation, useRoute} from '@react-navigation/native';
import {HomeScreenProps} from './HomeScreen.types';

export const useHomeScreenNavigation = () =>
  useNavigation<HomeScreenProps['navigation']>();
export const useHomeScreenRoute = () => useRoute<HomeScreenProps['route']>();
