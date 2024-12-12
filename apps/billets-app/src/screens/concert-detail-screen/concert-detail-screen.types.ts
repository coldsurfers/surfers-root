import { zodScreen, ZodScreenParams } from '@/lib'
import { ConcertStackScreenProps } from '@/navigations'

export type ConcertDetailScreenParams = ZodScreenParams<typeof zodScreen.ConcertDetailScreen>

export type ConcertDetailScreenProps = ConcertStackScreenProps<typeof zodScreen.ConcertDetailScreen.name>
