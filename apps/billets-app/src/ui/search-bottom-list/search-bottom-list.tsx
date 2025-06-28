import { memo } from 'react';
import { match } from 'ts-pattern';
import type { SearchStoreLocationConcert } from '../../features/search/store';
import { SearchBottomKeywordResultList } from '../search-bottom-keyword-result-list';
import { SearchDefaultBottomResultList } from '../search-default-bottom-result-list';
import { SearchLocationConcertList } from '../search-location-concert-list';

export type SearchBottomListProps =
  | {
      type: 'search';
      keyword: string;
    }
  | {
      type: 'map';
      events: SearchStoreLocationConcert[];
    }
  | {
      type: 'default';
    };

export const SearchBottomList = memo((props: SearchBottomListProps) => {
  return match(props)
    .with({ type: 'search' }, (value) => {
      return <SearchBottomKeywordResultList keyword={value.keyword} />;
    })
    .with({ type: 'map' }, (value) => {
      return <SearchLocationConcertList locationConcerts={value.events} />;
    })
    .with({ type: 'default' }, () => {
      return <SearchDefaultBottomResultList />;
    })
    .exhaustive();
});
