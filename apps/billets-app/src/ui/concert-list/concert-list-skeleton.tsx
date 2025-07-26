import { memo } from 'react';
import { FlatList, type ListRenderItem } from 'react-native';
import { ConcertListItem } from '../concert-list-item';
import { EventCategoryListSkeleton } from '../event-category-list';
import { concertListStyles } from './concert-list.styles';

const renderItem: ListRenderItem<number> = ({ index }) => {
  return (
    <ConcertListItem.Skeleton
      style={{
        paddingLeft: index % 2 === 0 ? 0 : 6,
        paddingRight: index % 2 === 0 ? 6 : 0,
      }}
    />
  );
};

const data = Array.from({ length: 5 }).map((_, index) => index);

export const ConcertListSkeleton = memo(() => {
  return (
    <FlatList
      data={data}
      numColumns={2}
      renderItem={renderItem}
      ListHeaderComponent={<EventCategoryListSkeleton />}
      contentContainerStyle={concertListStyles.concertListContentContainer}
    />
  );
});
