import { useNavigation, useRoute } from '@react-navigation/native';
import type { HomeScreenProps } from './home-screen.types';

export const useHomeScreenNavigation = () => useNavigation<HomeScreenProps['navigation']>();
export const useHomeScreenRoute = () => useRoute<HomeScreenProps['route']>();
