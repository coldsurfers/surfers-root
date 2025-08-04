import { useNavigation, useRoute } from '@react-navigation/native';
import type { EventCategoryScreenProps } from './event-category-screen.types';

export const useEventCategoryScreenNavigation = () =>
  useNavigation<EventCategoryScreenProps['navigation']>();
export const useEventCategoryScreenRoute = () => useRoute<EventCategoryScreenProps['route']>();
