import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {match} from 'ts-pattern';
import {SEARCH_ITEM_THUMBNAIL_SIZE} from './constants';

const SearchItemThumbnail = ({
  uri,
  type,
}: {
  uri: string;
  type: 'square' | 'circle';
}) => {
  const wrapperStyle = match(type)
    .with('circle', () => styles.wrapperCircle)
    .with('square', () => styles.wrapperSquare)
    .otherwise(() => undefined);
  const imgStyle = match(type)
    .with('circle', () => styles.imgCircle)
    .with('square', () => styles.imgSquare)
    .otherwise(() => undefined);
  return (
    <View style={wrapperStyle}>
      <FastImage source={{uri}} style={imgStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapperCircle: {
    width: SEARCH_ITEM_THUMBNAIL_SIZE,
    height: SEARCH_ITEM_THUMBNAIL_SIZE,
    borderRadius: SEARCH_ITEM_THUMBNAIL_SIZE / 2,
  },
  wrapperSquare: {
    width: SEARCH_ITEM_THUMBNAIL_SIZE,
    height: SEARCH_ITEM_THUMBNAIL_SIZE,
    borderRadius: 4,
  },
  imgCircle: {
    width: '100%',
    height: '100%',
    borderRadius: SEARCH_ITEM_THUMBNAIL_SIZE / 2,
  },
  imgSquare: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
});

export default SearchItemThumbnail;
