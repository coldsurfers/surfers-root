import type { HomeScreenProps } from '@/screens';
import { useNavigation, useRoute } from '@react-navigation/native';

export const useHomeScreenNavigation = () => useNavigation<HomeScreenProps['navigation']>();
export const useHomeScreenRoute = () => useRoute<HomeScreenProps['route']>();
