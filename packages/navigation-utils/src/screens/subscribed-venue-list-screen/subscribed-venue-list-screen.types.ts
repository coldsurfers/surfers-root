import type { SubscribedStackScreenProps } from '../../navigations/subscribed-stack-navigation';
import type { ZodScreenParams, zodScreen } from '../../utils';

export type SubscribedVenueListScreenParams = ZodScreenParams<
  typeof zodScreen.SubscribedVenueListScreen
>;
export type SubscribedVenueListScreenProps = SubscribedStackScreenProps<
  typeof zodScreen.SubscribedVenueListScreen.name
>;
