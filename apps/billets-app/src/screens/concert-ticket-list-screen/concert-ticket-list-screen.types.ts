import type { ZodScreenParams, zodScreen } from '@/lib';
import type { EventStackScreenProps } from '@coldsurfers/navigation-utils';

export type ConcertTicketListScreenParams = ZodScreenParams<
  typeof zodScreen.ConcertTicketListScreen
>;

export type ConcertTicketListScreenProps = EventStackScreenProps<
  typeof zodScreen.ConcertTicketListScreen.name
>;
