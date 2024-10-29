import React, {memo, useCallback} from 'react';
import {FlatList, ListRenderItem, StyleSheet} from 'react-native';
import {Concert} from '../../../types/Concert';
// import {GigNews} from '../../../lib/api/concert';
import ThumbnailCard from '../ConcertCollectionList/ThumbnailCard';
import {ConcertListData} from './types';

interface Props {
  data: ConcertListData;
  onPressItem?: (id: number) => void;
}

const List = ({data, onPressItem}: Props) => {
  const renderItem: ListRenderItem<Concert> = useCallback(
    ({item: {posters, id, title}, index}) => {
      const isLast = index === data.length - 1;
      const onPress = () => {
        onPressItem && onPressItem(id);
      };
      if (posters && posters.length > 0) {
        return (
          <ThumbnailCard
            key={id}
            onPressItem={onPress}
            containerStyle={isLast && styles.lastItemWrapper}
            thumbnailUri={posters[0].imageURL}
            title={title}
          />
        );
      }
      return null;
    },
    [data.length, onPressItem],
  );

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal
      contentContainerStyle={styles.contentContainer}
      data={data}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {marginBottom: 16},
  lastItemWrapper: {marginRight: 8},
});

export default memo(List);
