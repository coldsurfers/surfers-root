import type { SubscribedStackScreenProps } from '../../navigations/subscribed-stack-navigation';
import type { ZodScreenParams, zodScreen } from '../../utils';

export type SubscribedConcertListScreenParams = ZodScreenParams<
  typeof zodScreen.SubscribedConcertListScreen
>;
export type SubscribedConcertListScreenProps = SubscribedStackScreenProps<
  typeof zodScreen.SubscribedConcertListScreen.name
>;
