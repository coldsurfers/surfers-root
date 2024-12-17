import { zodScreen, ZodScreenParams } from '@/lib'
import { SearchStackScreenProps } from '@/navigations'

export type ConcertMapScreenParams = ZodScreenParams<typeof zodScreen.ConcertMapScreen>

export type ConcertMapScreenProps = SearchStackScreenProps<typeof zodScreen.ConcertMapScreen.name>
