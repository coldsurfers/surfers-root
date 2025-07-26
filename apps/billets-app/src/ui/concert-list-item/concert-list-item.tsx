import { ConcertSubscribeButton } from '@/features/subscribe';
import { apiClient } from '@/lib/api/openapi-client';
import type { components } from '@/types/api';
import { Text, useColorScheme } from '@coldsurfers/ocean-road/native';
import FastImage from '@d11/react-native-fast-image';
import { useQuery } from '@tanstack/react-query';
import format from 'date-fns/format';
import { useCallback, useMemo } from 'react';
import { Pressable, type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';
import {
  getConcertListBottomWrapperDynamicStyles,
  getConcertListItemWrapperDynamicStyles,
} from './concert-list-item.utils';

type ConcertListItemProps = {
  data: components['schemas']['ConcertDTOSchema'];
  onPress: (concertId: string) => void;
  onPressSubscribe?: (params: { isSubscribed: boolean; concertId: string }) => void;
  size?: 'small' | 'large';
  style?: StyleProp<ViewStyle>;
};

export const ConcertListItem = ({
  data,
  onPress,
  onPressSubscribe,
  size = 'large',
  style,
}: ConcertListItemProps) => {
  const { semantics } = useColorScheme();

  const { data: subscribedConcertData } = useQuery({
    queryKey: apiClient.subscribe.queryKeys.eventSubscribe({ eventId: data.id }),
    queryFn: () => apiClient.subscribe.getEvent({ eventId: data.id }),
  });

  const thumbnailUrl = useMemo(() => {
    const url = data.mainPoster?.url;
    if (!url) {
      return '';
    }
    return `${url}`;
  }, [data.mainPoster?.url]);
  const venue = useMemo(() => data.mainVenue, [data.mainVenue]);

  const handlePress = useCallback(() => {
    onPress(data.id);
  }, [data.id, onPress]);
  const handlePressSubscribe = useCallback(() => {
    onPressSubscribe?.({
      isSubscribed: !!subscribedConcertData,
      concertId: data.id,
    });
  }, [onPressSubscribe, subscribedConcertData, data.id]);

  return (
    <Pressable
      onPress={handlePress}
      style={[styles.concertListItem, getConcertListItemWrapperDynamicStyles(size), style]}
    >
      <FastImage
        source={{ uri: thumbnailUrl }}
        style={[
          styles.concertThumbnail,
          {
            backgroundColor: semantics.background[1],
          },
        ]}
      >
        {onPressSubscribe && (
          <View style={styles.subscribeBtnWrapper}>
            <ConcertSubscribeButton
              onPress={handlePressSubscribe}
              isSubscribed={!!subscribedConcertData}
            />
          </View>
        )}
      </FastImage>
      <View style={[styles.bottom, getConcertListBottomWrapperDynamicStyles(size)]}>
        <View style={styles.concertInfoWrapper}>
          <Text
            numberOfLines={size === 'small' ? 2 : 0}
            style={[
              styles.concertTitle,
              {
                color: semantics.foreground[1],
              },
              {
                fontSize: size === 'small' ? 12 : 14,
              },
            ]}
          >
            {data.title}
          </Text>
          <View>
            <Text
              style={[
                styles.concertFormattedDate,
                {
                  color: semantics.foreground[4],
                  fontSize: size === 'small' ? 12 : 14,
                  marginTop: size === 'small' ? 2 : 4,
                },
              ]}
            >
              {format(new Date(data.date), 'EEE, MMM d')}
            </Text>
            {venue ? (
              <Text
                style={[
                  {
                    color: semantics.foreground[3],
                    fontSize: size === 'small' ? 12 : 14,
                  },
                ]}
              >
                {venue.name}
              </Text>
            ) : null}
          </View>
        </View>
      </View>
    </Pressable>
  );
};

ConcertListItem.Skeleton = ({
  size = 'large',
  style,
}: { size?: 'small' | 'large'; style?: StyleProp<ViewStyle> }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { semantics } = useColorScheme();
  return (
    <Pressable
      style={[styles.concertListItem, getConcertListItemWrapperDynamicStyles(size), style]}
    >
      <View
        style={[
          styles.concertThumbnail,
          styles.skeletonBackground,
          {
            backgroundColor: semantics.background[2],
          },
        ]}
      />
      <View style={[styles.bottom, getConcertListBottomWrapperDynamicStyles(size)]}>
        <View style={{ width: '100%' }}>
          <View
            style={[
              styles.skeletonTitle,
              {
                backgroundColor: semantics.background[2],
              },
            ]}
          />
          {size === 'small' && (
            <View style={[styles.skeletonTitle, { backgroundColor: semantics.background[2] }]} />
          )}
          <View
            style={[
              styles.skeletonSubtitle,
              {
                marginTop: size === 'small' ? 4 : 8,
                backgroundColor: semantics.background[2],
              },
            ]}
          />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  concertListItem: {
    backgroundColor: 'transparent',
    marginBottom: 16,
  },
  concertThumbnail: {
    width: '100%',
    aspectRatio: 1 / 1,
    borderRadius: 8,
  },
  concertTitle: { fontWeight: 'bold' },
  concertFormattedDate: {
    fontSize: 14,
  },
  concertVenue: {
    fontSize: 12,
  },
  concertListContentContainer: {
    paddingHorizontal: 12,
    marginTop: 12,
    paddingBottom: 24,
    flexGrow: 1,
  },
  concertInfoWrapper: {},
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subscribeBtnWrapper: { position: 'absolute', right: 6, bottom: 6 },
  skeletonBackground: {},
  skeletonTitle: {
    width: '80%',
    height: 24,
    borderRadius: 8,
    marginTop: 4,
  },
  skeletonSubtitle: {
    width: '20%',
    height: 24,
    borderRadius: 8,
  },
});
