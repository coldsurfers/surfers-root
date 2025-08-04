import type { SearchStackScreenProps } from '../../navigations/search-stack-navigation';
import type { ZodScreenParams, zodScreen } from '../../utils';

export type SearchScreenParams = ZodScreenParams<typeof zodScreen.SearchScreen>;

export type SearchScreenProps = SearchStackScreenProps<typeof zodScreen.SearchScreen.name>;
