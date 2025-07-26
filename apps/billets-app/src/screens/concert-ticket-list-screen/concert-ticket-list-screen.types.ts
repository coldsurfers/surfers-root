import type { ZodScreenParams, zodScreen } from '@/lib';
import type { EventStackScreenProps } from '@/navigations/event-stack-navigation/event-stack-navigation.types';

export type ConcertTicketListScreenParams = ZodScreenParams<
  typeof zodScreen.ConcertTicketListScreen
>;

export type ConcertTicketListScreenProps = EventStackScreenProps<
  typeof zodScreen.ConcertTicketListScreen.name
>;
