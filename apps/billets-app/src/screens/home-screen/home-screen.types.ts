import { zodScreen, ZodScreenParams } from '@/lib'
import { HomeStackScreenProps } from '@/navigations'

export type HomeScreenParams = ZodScreenParams<typeof zodScreen.HomeScreen>

export type HomeScreenProps = HomeStackScreenProps<typeof zodScreen.HomeScreen.name>
