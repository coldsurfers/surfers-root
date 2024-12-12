import { zodScreen, ZodScreenParams } from '@/lib'
import { SubscribedStackScreenProps } from '@/navigations'

export type SubscribedConcertListScreenParams = ZodScreenParams<typeof zodScreen.SubscribedConcertListScreen>
export type SubscribedConcertListScreenProps = SubscribedStackScreenProps<
  typeof zodScreen.SubscribedConcertListScreen.name
>
