import type { EventCategoryScreenProps } from '@/screens/event-category-screen';
import { useNavigation, useRoute } from '@react-navigation/native';

export const useEventCategoryScreenNavigation = () =>
  useNavigation<EventCategoryScreenProps['navigation']>();
export const useEventCategoryScreenRoute = () => useRoute<EventCategoryScreenProps['route']>();
