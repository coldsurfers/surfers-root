import { zodScreen, ZodScreenParams } from '@/lib/navigations'
import { EventStackScreenProps } from '@/navigations/event-stack-navigation'

export type EventCategoryScreenParams = ZodScreenParams<typeof zodScreen.EventCategoryScreen>
export type EventCategoryScreenProps = EventStackScreenProps<typeof zodScreen.EventCategoryScreen.name>
