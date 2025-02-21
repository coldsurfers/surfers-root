import { zodScreen, ZodScreenParams } from '@/lib'
import { SubscribedStackScreenProps } from '@/navigations'

export type SubscribedArtistListScreenParams = ZodScreenParams<typeof zodScreen.SubscribedArtistListScreen>
export type SubscribedArtistListScreenProps = SubscribedStackScreenProps<
  typeof zodScreen.SubscribedArtistListScreen.name
>
