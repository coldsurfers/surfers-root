import { useNavigation, useRoute } from '@react-navigation/native';
import type { EventDetailScreenProps } from './event-detail-screen.types';

export const useEventDetailScreenNavigation = () => {
  return useNavigation<EventDetailScreenProps['navigation']>();
};

export const useEventDetailScreenRoute = () => {
  return useRoute<EventDetailScreenProps['route']>();
};
