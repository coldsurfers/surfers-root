import { colors } from '@coldsurfers/ocean-road';
import { Text, useColorScheme } from '@coldsurfers/ocean-road/native';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { match } from 'ts-pattern';
import palettes from '../../lib/palettes';
import { HorizontalConcertItem } from '../horizontal-concert-item';
import { SearchItemThumbnail } from '../search-item-thumbnail';
import type { SearchItemProps } from './search-item.types';

export function SearchItem({
  type,
  thumbnail,
  title,
  subtitle,
  description,
  onPress,
}: SearchItemProps) {
  const { semantics } = useColorScheme();
  return match(type)
    .with('artist', () => (
      <TouchableOpacity onPress={onPress} style={styles.itemWrapper}>
        {thumbnail}
        <View style={styles.itemInnerRight}>
          <Text weight="bold" style={[styles.itemTitle, { color: semantics.foreground[1] }]}>
            {title}
          </Text>
          <Text weight="medium" style={[styles.itemSubtitle, { color: semantics.foreground[2] }]}>
            {subtitle}
          </Text>
        </View>
      </TouchableOpacity>
    ))
    .with('venue', () => {
      return (
        <TouchableOpacity onPress={onPress} style={styles.itemWrapper}>
          {thumbnail}
          <View style={styles.itemInnerRight}>
            <Text weight="bold" style={[styles.itemTitle, { color: semantics.foreground[1] }]}>
              {title}
            </Text>
            <Text weight="medium" style={[styles.itemSubtitle, { color: semantics.foreground[2] }]}>
              {subtitle}
            </Text>
          </View>
        </TouchableOpacity>
      );
    })
    .with('concert', () => {
      return (
        <HorizontalConcertItem
          title={title}
          subtitle={subtitle}
          description={description ?? ''}
          thumbnailComponent={thumbnail}
          onPress={onPress}
        />
      );
    })
    .otherwise(() => null);
}

SearchItem.Skeleton = () => {
  return (
    <TouchableOpacity style={[styles.itemWrapper, { alignItems: 'flex-start' }]}>
      <SearchItemThumbnail.Skeleton />
      <View style={styles.itemInnerRight}>
        <View style={styles.skeletonTitle} />
        <View style={styles.skeletonSubtitle} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  itemInnerRight: {
    marginLeft: 8,
    flex: 1,
  },
  itemTitle: { fontSize: 14 },
  itemSubtitle: { color: palettes.gray['800'], fontSize: 14 },
  skeletonTitle: {
    width: '100%',
    backgroundColor: colors.oc.gray[4].value,
    height: 24,
    marginBottom: 4,
    borderRadius: 4,
  },
  skeletonSubtitle: {
    width: '100%',
    backgroundColor: colors.oc.gray[4].value,
    height: 16,
    borderRadius: 4,
  },
});
