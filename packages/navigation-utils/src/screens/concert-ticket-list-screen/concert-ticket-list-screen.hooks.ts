import { useNavigation, useRoute } from '@react-navigation/native';
import type { ConcertTicketListScreenProps } from './concert-ticket-list-screen.types';

export const useConcertTicketListScreenNavigation = () => {
  return useNavigation<ConcertTicketListScreenProps['navigation']>();
};

export const useConcertTicketListScreenRoute = () => {
  return useRoute<ConcertTicketListScreenProps['route']>();
};
