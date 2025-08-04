import type { EventStackScreenProps } from '../../navigations/event-stack-navigation';
import type { ZodScreenParams, zodScreen } from '../../utils';

export type ConcertTicketListScreenParams = ZodScreenParams<
  typeof zodScreen.ConcertTicketListScreen
>;

export type ConcertTicketListScreenProps = EventStackScreenProps<
  typeof zodScreen.ConcertTicketListScreen.name
>;
