import { apiClient } from '@/lib/api/openapi-client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { ActivityIndicator, FlatList, type ListRenderItem, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArtistDetailConcertListItem } from '../artist-detail-concert-list-item';
import { ArtistDetailTop } from '../artist-detail-top';

export const ArtistDetailConcertList = ({
  artistId,
  onPressItem,
  onPressArtistProfile,
}: {
  artistId: string;
  onPressItem?: (params: { eventId: string }) => void;
  onPressArtistProfile?: () => void;
}) => {
  const { bottom: bottomInset, top: topInset } = useSafeAreaInsets();
  const { data: artistDetailData, isLoading: isLoadingArtistDetailData } = useSuspenseQuery({
    queryKey: apiClient.artist.queryKeys.detail(artistId),
    queryFn: () => apiClient.artist.getArtistDetail(artistId),
  });
  const artistConcertListUIData = useMemo(() => {
    return artistDetailData.upcomingEvents
      .filter((value) => value.type === 'concert')
      .map((value) => {
        return value.data;
      });
  }, [artistDetailData.upcomingEvents]);

  const renderItem = useCallback<ListRenderItem<(typeof artistConcertListUIData)[number]>>(
    (info) => {
      return (
        <ArtistDetailConcertListItem
          item={info.item}
          onPress={() => onPressItem?.({ eventId: info.item.id })}
        />
      );
    },
    [onPressItem]
  );

  if (isLoadingArtistDetailData) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator animating />
      </View>
    );
  }

  return (
    <FlatList
      ListHeaderComponent={
        <ArtistDetailTop artistId={artistId} onPressArtistProfile={onPressArtistProfile} />
      }
      data={artistConcertListUIData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={[
        styles.contentContainer,
        { paddingBottom: bottomInset ? bottomInset : 12, paddingTop: topInset ? topInset : 12 },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 12,
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
