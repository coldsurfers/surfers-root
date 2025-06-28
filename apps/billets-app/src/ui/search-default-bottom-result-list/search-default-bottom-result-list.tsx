import { useUserCurrentLocationStore } from '@/features/location/stores';
import { useKeyboard, withHapticPress } from '@/lib';
import { apiClient } from '@/lib/api/openapi-client';
import { useSearchScreenNavigation } from '@/screens/search-screen/search-screen.hooks';
import type { components } from '@/types/api';
import { Text, useColorScheme } from '@coldsurfers/ocean-road/native';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import format from 'date-fns/format';
import { useCallback, useMemo } from 'react';
import { type ListRenderItem, StyleSheet } from 'react-native';
import { SearchItem } from '../search-item';
import { SearchItemThumbnail } from '../search-item-thumbnail';

const FetchSearchConcertItem = ({
  item,
  onPress,
}: {
  item: components['schemas']['ConcertDTOSchema'];
  onPress: () => void;
}) => {
  return (
    <SearchItem
      type="concert"
      thumbnail={<SearchItemThumbnail type="square" uri={item.mainPoster?.url ?? ''} />}
      title={item.title}
      subtitle={format(new Date(item.date), 'yyyy.MM.dd')}
      description={item.mainVenue?.name ?? ''}
      onPress={onPress}
    />
  );
};

export const SearchDefaultBottomResultList = () => {
  const { semantics } = useColorScheme();
  const { bottomPadding } = useKeyboard();
  const userCurrentLocation = useUserCurrentLocationStore();
  const navigation = useSearchScreenNavigation();
  const queryParams = useMemo(() => {
    if (userCurrentLocation.cityId !== null) {
      return {
        locationCityId: userCurrentLocation.cityId,
        offset: 0,
        size: 20,
      };
    }
    return {
      latitude: userCurrentLocation.latitude ?? undefined,
      longitude: userCurrentLocation.longitude ?? undefined,
      offset: 0,
      size: 20,
    };
  }, [userCurrentLocation.cityId, userCurrentLocation.latitude, userCurrentLocation.longitude]);
  const { data: concertList } = useQuery({
    queryKey: apiClient.event.queryKeys.list(queryParams),
    queryFn: () => apiClient.event.getEvents(queryParams),
  });
  const concertListUIData = useMemo(() => {
    return (
      concertList
        ?.filter((value) => value.type === 'concert')
        .map((value) => {
          return value.data;
        }) ?? []
    );
  }, [concertList]);

  const renderConcertListItem: ListRenderItem<(typeof concertListUIData)[number]> = useCallback(
    ({ item: value }) => {
      const onPress = () => {
        navigation.navigate('EventStackNavigation', {
          screen: 'EventDetailScreen',
          params: { eventId: value.id },
        });
      };
      return (
        <FetchSearchConcertItem item={value} onPress={withHapticPress(onPress, 'impactMedium')} />
      );
    },
    [navigation]
  );

  return (
    <BottomSheetFlatList
      data={concertListUIData}
      bounces={false}
      focusHook={useFocusEffect}
      ListHeaderComponent={
        <Text weight="bold" style={[styles.listHeaderText, { color: semantics.foreground[1] }]}>
          현재 지역의 공연
        </Text>
      }
      contentContainerStyle={[
        styles.contentContainer,
        { paddingBottom: bottomPadding, backgroundColor: semantics.background[3] },
      ]}
      keyExtractor={(item) => item.id}
      renderItem={renderConcertListItem}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    paddingTop: 12,
    paddingHorizontal: 14,
    // backgroundColor: colors.oc.gray[1].value,
  },
  listHeaderText: {
    fontSize: 14,
  },
});
