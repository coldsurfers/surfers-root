import type { ZodScreenParams, zodScreen } from '@/lib';
import type { SubscribedStackScreenProps } from '@/navigations';

export type SubscribedArtistListScreenParams = ZodScreenParams<
  typeof zodScreen.SubscribedArtistListScreen
>;
export type SubscribedArtistListScreenProps = SubscribedStackScreenProps<
  typeof zodScreen.SubscribedArtistListScreen.name
>;
