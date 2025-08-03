import type { SubscribedStackScreenProps } from '../../navigations/subscribed-stack-navigation';
import type { ZodScreenParams, zodScreen } from '../../utils';

export type SubscribedArtistListScreenParams = ZodScreenParams<
  typeof zodScreen.SubscribedArtistListScreen
>;
export type SubscribedArtistListScreenProps = SubscribedStackScreenProps<
  typeof zodScreen.SubscribedArtistListScreen.name
>;
