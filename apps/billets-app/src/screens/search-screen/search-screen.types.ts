import type { ZodScreenParams, zodScreen } from '@/lib';
import type { SearchStackScreenProps } from '@/navigations';

export type SearchScreenParams = ZodScreenParams<typeof zodScreen.SearchScreen>;

export type SearchScreenProps = SearchStackScreenProps<typeof zodScreen.SearchScreen.name>;
