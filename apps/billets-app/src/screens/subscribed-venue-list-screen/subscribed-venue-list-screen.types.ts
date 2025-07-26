import type { ZodScreenParams, zodScreen } from '@/lib';
import type { SubscribedStackScreenProps } from '@/navigations';

export type SubscribedVenueListScreenParams = ZodScreenParams<
  typeof zodScreen.SubscribedVenueListScreen
>;
export type SubscribedVenueListScreenProps = SubscribedStackScreenProps<
  typeof zodScreen.SubscribedVenueListScreen.name
>;
