import { zodScreen, ZodScreenParams } from '@/lib'
import { HomeStackScreenProps } from '../../navigations/home-stack-navigation/home-stack-navigation.types'

export type EventCategoryScreenParams = ZodScreenParams<typeof zodScreen.EventCategoryScreen>
export type EventCategoryScreenProps = HomeStackScreenProps<typeof zodScreen.EventCategoryScreen.name>
