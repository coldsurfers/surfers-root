import { apiClient } from '@/lib/api/openapi-client';
import palettes from '@/lib/palettes';
import type { components } from '@/types/api';
import { colors } from '@coldsurfers/ocean-road';
import { Text, useColorScheme } from '@coldsurfers/ocean-road/native';
import { useSuspenseQuery } from '@tanstack/react-query';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SearchItemThumbnail } from '../search-item-thumbnail';

export function SubscribedArtistListItem({
  data,
  onPress,
}: {
  data: components['schemas']['ArtistSubscribeDTOSchema'];
  onPress: (artistId: string) => void;
}) {
  const { semantics } = useColorScheme();
  const { data: artistDetailData } = useSuspenseQuery({
    queryKey: apiClient.artist.queryKeys.detail(data.artistId),
    queryFn: () => apiClient.artist.getArtistDetail(data.artistId),
  });
  const mainPoster = artistDetailData.thumbUrl;
  return (
    <TouchableOpacity onPress={() => onPress(data.artistId)} style={styles.itemWrapper}>
      <SearchItemThumbnail
        type="circle"
        emptyBgText={artistDetailData.name.at(0)}
        uri={mainPoster ?? ''}
      />
      <View style={styles.itemInnerRight}>
        <Text weight="bold" style={[styles.itemTitle, { color: semantics.foreground[1] }]}>
          {artistDetailData.name}
        </Text>
        <Text weight="medium" style={[styles.itemSubtitle, { color: semantics.foreground[2] }]}>
          아티스트
        </Text>
      </View>
    </TouchableOpacity>
  );
}

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
