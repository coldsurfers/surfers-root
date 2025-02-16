import { zodScreen, ZodScreenParams } from '@/lib'
import { SubscribedStackScreenProps } from '@/navigations'

export type SubscribedVenueListScreenParams = ZodScreenParams<typeof zodScreen.SubscribedVenueListScreen>
export type SubscribedVenueListScreenProps = SubscribedStackScreenProps<typeof zodScreen.SubscribedVenueListScreen.name>
