import { useKeyboard } from '@/lib';
import { apiClient } from '@/lib/api/openapi-client';
import { useSearchScreenNavigation } from '@/screens/search-screen/search-screen.hooks';
import { ProfileThumbnail, useColorScheme } from '@coldsurfers/ocean-road/native';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import format from 'date-fns/format';
import { useCallback, useMemo } from 'react';
import { type ListRenderItem, StyleSheet } from 'react-native';
import { match } from 'ts-pattern';
import type { z } from 'zod';
import { SearchBottomKeywordResultListEmpty } from '../search-bottom-keyword-result-list-empty';
import { SearchItem } from '../search-item';
import { SearchItemThumbnail } from '../search-item-thumbnail';
import type { searchBottomKeywordListItemSchema } from './search-bottom-keyword-result-list.types';

export const SearchBottomKeywordResultList = ({ keyword }: { keyword: string }) => {
  const { semantics } = useColorScheme();
  const navigation = useSearchScreenNavigation();
  const { bottomPadding } = useKeyboard();
  const {
    data: searchData,
    isLoading: isLoadingSearch,
    isFetched: isFetchedSearch,
  } = useQuery({
    queryKey: apiClient.search.queryKeys.list(keyword),
    queryFn: () => apiClient.search.getSearchResult(keyword),
    enabled: !!keyword,
  });

  const searchResultUIData = useMemo(() => {
    return searchData ?? [];
  }, [searchData]);

  const renderSearchListItem: ListRenderItem<z.infer<typeof searchBottomKeywordListItemSchema>> =
    useCallback(
      ({ item }) => {
        const onPressVenueItem = () => {
          navigation.navigate('VenueStackNavigation', {
            screen: 'VenueDetailScreen',
            params: {
              id: item.id,
            },
          });
        };
        const onPressArtistItem = () => {
          navigation.navigate('ArtistStackNavigation', {
            screen: 'ArtistDetailScreen',
            params: {
              artistId: item.id,
            },
          });
        };
        const onPressConcertItem = () =>
          navigation.navigate('EventStackNavigation', {
            screen: 'EventDetailScreen',
            params: { eventId: item.id },
          });
        return match(item)
          .with({ type: 'artist' }, (value) => (
            <SearchItem
              type="artist"
              thumbnail={
                <SearchItemThumbnail
                  type="circle"
                  emptyBgText={value.name.at(0)}
                  uri={value.profileImgUrl}
                />
              }
              title={value.name}
              subtitle="아티스트"
              onPress={onPressArtistItem}
            />
          ))
          .with({ type: 'venue' }, (value) => (
            <SearchItem
              type="venue"
              thumbnail={
                <SearchItemThumbnail type="circle" emptyBgText={value.name.at(0)} uri={''} />
              }
              title={value.name}
              subtitle="공연장"
              onPress={onPressVenueItem}
            />
          ))
          .with({ type: 'concert' }, (value) => (
            <SearchItem
              type="concert"
              thumbnail={
                <ProfileThumbnail
                  type={'square'}
                  emptyBgText={value.title.at(0) ?? ''}
                  imageUrl={value.thumbnailImgUrl ?? ''}
                  size="md"
                />
              }
              title={value.title}
              subtitle={format(new Date(value.date), 'EEE, MMM dd')}
              description={value.venueTitle}
              onPress={onPressConcertItem}
            />
          ))
          .otherwise(() => null);
      },
      [navigation]
    );

  return (
    <BottomSheetFlatList
      data={searchResultUIData}
      bounces={false}
      focusHook={useFocusEffect}
      renderItem={renderSearchListItem}
      keyExtractor={(item) => `${item.type}-${item.id}`}
      style={styles.list}
      contentContainerStyle={[
        styles.contentContainer,
        { paddingBottom: bottomPadding, backgroundColor: semantics.background[3] },
      ]}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <SearchBottomKeywordResultListEmpty
          isLoadingSearch={isLoadingSearch}
          isFetchedSearch={isFetchedSearch}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  list: { flex: 1 },
  contentContainer: {
    flexGrow: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
    // backgroundColor: colors.oc.gray[1].value,
  },
});
