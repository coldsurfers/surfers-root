import { zodScreen, ZodScreenParams } from '@/lib'
import { ConcertStackScreenProps } from '@/navigations'

export type ConcertTicketListScreenParams = ZodScreenParams<typeof zodScreen.ConcertTicketListScreen>

export type ConcertTicketListScreenProps = ConcertStackScreenProps<typeof zodScreen.ConcertTicketListScreen.name>
