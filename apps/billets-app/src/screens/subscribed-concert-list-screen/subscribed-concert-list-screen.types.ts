import type { ZodScreenParams, zodScreen } from '@/lib';
import type { SubscribedStackScreenProps } from '@/navigations';

export type SubscribedConcertListScreenParams = ZodScreenParams<
  typeof zodScreen.SubscribedConcertListScreen
>;
export type SubscribedConcertListScreenProps = SubscribedStackScreenProps<
  typeof zodScreen.SubscribedConcertListScreen.name
>;
