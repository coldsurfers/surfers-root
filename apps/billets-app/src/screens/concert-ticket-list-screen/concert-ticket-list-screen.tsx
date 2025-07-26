import { TicketItem } from '@/features';
import { apiClient } from '@/lib/api/openapi-client';
import { CommonScreenLayout, NAVIGATION_HEADER_HEIGHT } from '@/ui';
import { colors } from '@coldsurfers/ocean-road';
import { Text, useColorScheme } from '@coldsurfers/ocean-road/native';
import FastImage from '@d11/react-native-fast-image';
import { useSuspenseQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useCallback, useMemo } from 'react';
import { Dimensions, FlatList, type ListRenderItem, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useConcertTicketListScreenRoute } from './concert-ticket-list-screen.hooks';

const ListHeader = ({
  posterThumbnail,
  concertTitle,
  concertVenue,
  concertDate,
}: {
  posterThumbnail: string;
  concertTitle: string;
  concertDate: string;
  concertVenue: string;
}) => {
  const { semantics } = useColorScheme();
  return (
    <View>
      <View style={styles.headerImageWrapper}>
        <FastImage source={{ uri: posterThumbnail }} style={styles.headerImage} />
      </View>
      <View style={styles.headerContentWrapper}>
        <Text weight="bold" style={[styles.headerTitle, { color: semantics.foreground[1] }]}>
          {concertTitle}
        </Text>
        <Text style={[styles.headerDate, { color: semantics.foreground[2] }]}>
          {format(new Date(concertDate ?? ''), 'MMM dd, hh:mm a')}
        </Text>
        <Text style={[styles.headerVenue, { color: semantics.foreground[2] }]}>{concertVenue}</Text>
      </View>
    </View>
  );
};

export const ConcertTicketListScreen = () => {
  const { bottom: bottomInset } = useSafeAreaInsets();
  const route = useConcertTicketListScreenRoute();
  const { concertId } = route.params;
  const { data } = useSuspenseQuery({
    queryKey: apiClient.event.queryKeys.detail(concertId),
    queryFn: () => apiClient.event.getEventDetail(concertId),
  });
  const { data: ticketData } = useSuspenseQuery({
    queryKey: apiClient.ticket.queryKeys.list({ eventId: concertId }),
    queryFn: () => apiClient.ticket.getTicketsByEventId(concertId),
  });

  const concertDetailData = useMemo(() => {
    if (data.type !== 'concert') {
      return null;
    }
    return data.data;
  }, [data.data, data.type]);

  const posterThumbnail = useMemo(() => {
    return concertDetailData?.posters.at(0) ?? null;
  }, [concertDetailData?.posters]);
  const concertTitle = useMemo(() => {
    return concertDetailData?.title ?? null;
  }, [concertDetailData?.title]);
  const concertDate = useMemo(() => {
    return concertDetailData?.date ?? null;
  }, [concertDetailData?.date]);
  const concertVenue = useMemo(() => {
    return concertDetailData?.venues?.at(0)?.name;
  }, [concertDetailData?.venues]);
  const concertTickets = useMemo(() => {
    return ticketData;
  }, [ticketData]);

  const renderItem = useCallback<ListRenderItem<(typeof concertTickets)[number]>>(({ item }) => {
    return <TicketItem ticket={item} />;
  }, []);

  return (
    <CommonScreenLayout style={{ marginTop: -NAVIGATION_HEADER_HEIGHT }}>
      <FlatList
        style={styles.listStyle}
        contentContainerStyle={{
          paddingBottom: bottomInset + 32,
        }}
        data={concertTickets}
        renderItem={renderItem}
        ListHeaderComponent={
          <ListHeader
            concertTitle={concertTitle ?? ''}
            concertDate={concertDate ?? ''}
            concertVenue={concertVenue ?? ''}
            posterThumbnail={posterThumbnail?.url ?? ''}
          />
        }
        bounces={false}
      />
    </CommonScreenLayout>
  );
};

const styles = StyleSheet.create({
  listStyle: { flex: 1 },
  headerImageWrapper: { width: '100%', height: Dimensions.get('screen').height / 2 },
  headerImage: { width: '100%', height: '100%' },
  headerContentWrapper: { marginTop: 24, paddingHorizontal: 12 },
  headerTitle: { fontSize: 20 },
  headerDate: { marginTop: 6, fontSize: 14 },
  headerVenue: { marginTop: 6, color: colors.oc.gray[8].value, fontSize: 14 },
});
