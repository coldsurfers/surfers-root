import { zodScreen, ZodScreenParams } from '@/lib'
import { EventStackScreenProps } from '@/navigations/event-stack-navigation/event-stack-navigation.types'

export type EventDetailScreenParams = ZodScreenParams<typeof zodScreen.EventDetailScreen>

export type EventDetailScreenProps = EventStackScreenProps<typeof zodScreen.EventDetailScreen.name>
