import { zodScreen, ZodScreenParams } from '@/lib'
import { SearchStackScreenProps } from '@/navigations'

export type SearchScreenParams = ZodScreenParams<typeof zodScreen.SearchScreen>

export type SearchScreenProps = SearchStackScreenProps<typeof zodScreen.SearchScreen.name>
