/* eslint-disable no-case-declarations */
import { useMeQuery } from '@/features/auth/hooks/useMeQuery';
import { ConcertSubscribeButton } from '@/features/subscribe';
import { useSubscribedConcert } from '@/features/subscribe/hooks/useSubscribedConcert';
import { CONCERT_DETAIL_LIST_HEADER_HEIGHT } from '@/lib';
import commonStyles from '@/lib/common-styles';
import { colors } from '@coldsurfers/ocean-road';
import { useColorScheme } from '@coldsurfers/ocean-road/native';
import FastImage from '@d11/react-native-fast-image';
import React, { type ReactElement, type ReactNode, useCallback, useMemo } from 'react';
import { Animated, Dimensions, type SectionListRenderItem, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useConcertDetail } from '../../hooks/useConcertDetail';
import { ConcertDetailSectionListHeaderItem } from '../concert-detail-section-list-header-item';
import {
  type ConcertDetailSectionListAboutItemProps,
  type ConcertDetailSectionListDateItemProps,
  ConcertDetailSectionListItem,
  type ConcertDetailSectionListLineupItemProps,
  type ConcertDetailSectionListLocationItemProps,
  type ConcertDetailSectionListPriceItemProps,
  type ConcertDetailSectionListTicketOpenDateItemProps,
  type ConcertDetailSectionListTicketSellerItemProps,
  type ConcertDetailSectionListTicketsItemProps,
  type ConcertDetailSectionListTitleItemProps,
  type ConcertDetailSectionListVenueMapItemProps,
  VENUE_MAP_HEIGHT,
} from '../concert-detail-section-list-item';
import type {
  ConcertDetailSectionListItemT,
  ConcertDetailSectionListSection,
  ConcertDetailSectionListSectionT,
} from './concert-detail-section-list.types';

interface ConcertDetailSectionListProps {
  id: string;
  onPressTicketCta?: () => void;
  onPressArtist?: (artistId: string) => void;
  onPressVenueMap?: () => void;
  onPressVenueProfile?: (venueId: string) => void;
  onPressSubscribe: (
    params: { isLoggedIn: false } | { isLoggedIn: true; concertId: string; isSubscribed: boolean }
  ) => void;
}

export const ConcertDetailSectionList = ({
  id,
  onPressTicketCta,
  onPressArtist,
  onPressVenueMap,
  onPressVenueProfile,
  onPressSubscribe,
}: ConcertDetailSectionListProps) => {
  const { sections, thumbnails } = useConcertDetail({
    id,
    onPressTicketCta,
    onPressArtist,
    onPressVenueMap,
    onPressVenueProfile,
  });
  const { semantics } = useColorScheme();
  const { top: topInset } = useSafeAreaInsets();

  const [scrollY] = React.useState(new Animated.Value(0));

  const { meData } = useMeQuery();
  const { subscribedConcert } = useSubscribedConcert(id);

  const isSubscribed = useMemo(() => !!subscribedConcert, [subscribedConcert]);

  const coverTranslateY = scrollY.interpolate({
    inputRange: [-4, 0, 10],
    outputRange: [-2, 0, 3],
  });
  const coverScale = scrollY.interpolate({
    inputRange: [-200, 0],
    outputRange: [1.4, 1],
    extrapolateRight: 'clamp',
  });

  const thumbnailUrl = useMemo(() => {
    const thumbnail = thumbnails.at(0);
    if (!thumbnail) {
      return '';
    }
    return `${thumbnail}`;
  }, [thumbnails]);

  const renderSectionHeader: (info: {
    section: ConcertDetailSectionListSection;
  }) => ReactElement | null = useCallback(
    (info) => {
      const { title, sectionHeaderTitle, data } = info.section;
      let children: ReactNode = null;
      if (data.length === 0) {
        return null;
      }
      switch (title) {
        case 'lineup':
        case 'venue-map':
        case 'about':
          children = sectionHeaderTitle ? (
            <ConcertDetailSectionListHeaderItem title={sectionHeaderTitle} />
          ) : null;
          break;
        default:
          children = null;
          break;
      }
      if (children === null) {
        return null;
      }
      return (
        <View style={[styles.headerWrapper, { backgroundColor: semantics.background[3] }]}>
          {children}
        </View>
      );
    },
    [semantics.background]
  );

  const renderItem: SectionListRenderItem<
    ConcertDetailSectionListItemT,
    ConcertDetailSectionListSectionT
  > = useCallback(
    (info) => {
      const { title } = info.section;
      let children: ReactNode = null;
      switch (title) {
        case 'title':
          children = (
            <ConcertDetailSectionListItem.TitleItem
              title={(info.item as ConcertDetailSectionListTitleItemProps).title}
            />
          );
          break;
        case 'date':
          children = (
            <ConcertDetailSectionListItem.DateItem
              {...(info.item as ConcertDetailSectionListDateItemProps)}
            />
          );
          break;
        case 'tickets':
          children = (
            <ConcertDetailSectionListItem.TicketsItem
              {...(info.item as ConcertDetailSectionListTicketsItemProps)}
            />
          );
          break;
        case 'about':
          children = (
            <ConcertDetailSectionListItem.AboutItem
              {...(info.item as ConcertDetailSectionListAboutItemProps)}
            />
          );
          break;
        case 'venue':
          children = (
            <ConcertDetailSectionListItem.LocationItem
              location={(info.item as ConcertDetailSectionListLocationItemProps).location}
            />
          );
          break;
        case 'lineup':
          children = (
            <ConcertDetailSectionListItem.LineupItem
              {...(info.item as ConcertDetailSectionListLineupItemProps)}
            />
          );
          break;
        case 'ticket-seller':
          children = (
            <ConcertDetailSectionListItem.TicketSellerItem
              {...(info.item as ConcertDetailSectionListTicketSellerItemProps)}
            />
          );
          break;
        case 'price-info':
          children = (
            <ConcertDetailSectionListItem.PriceInfoItem
              priceInfo={{ ...(info.item as ConcertDetailSectionListPriceItemProps).priceInfo }}
            />
          );
          break;
        case 'ticket-open-date':
          children = (
            <ConcertDetailSectionListItem.TicketOpenDateItem
              {...(info.item as ConcertDetailSectionListTicketOpenDateItemProps)}
            />
          );
          break;
        case 'venue-map':
          children = (
            <ConcertDetailSectionListItem.VenueMapItem
              {...(info.item as ConcertDetailSectionListVenueMapItemProps)}
            />
          );
          break;
        default:
          children = null;
          break;
      }
      return (
        <View style={[styles.commonContentWrapper, { backgroundColor: semantics.background[3] }]}>
          {children}
        </View>
      );
    },
    [semantics.background]
  );

  const handlePressSubscribe = useCallback(() => {
    const isLoggedIn = !!meData;

    if (!isLoggedIn) {
      onPressSubscribe?.({
        isLoggedIn: false,
      });
      return;
    }

    onPressSubscribe?.({
      isLoggedIn: true,
      concertId: id,
      isSubscribed,
    });
  }, [id, isSubscribed, meData, onPressSubscribe]);

  return (
    <>
      <Animated.SectionList
        style={{ flex: 1 }}
        contentContainerStyle={{
          backgroundColor: semantics.background[3],
          flexGrow: 1,
          paddingBottom: VENUE_MAP_HEIGHT,
        }}
        stickySectionHeadersEnabled={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          {
            useNativeDriver: true,
          }
        )}
        ListHeaderComponent={
          <>
            <Animated.View
              style={{
                height: CONCERT_DETAIL_LIST_HEADER_HEIGHT,
                transform: [
                  {
                    translateY: coverTranslateY,
                  },
                  {
                    scale: coverScale,
                  },
                ],
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <FastImage
                source={{
                  uri: thumbnailUrl,
                }}
                style={[
                  styles.thumbnail,
                  { backgroundColor: semantics.background[2], marginTop: topInset },
                ]}
                resizeMode="contain"
              />
            </Animated.View>
            <View style={styles.subscribeButtonPosition}>
              <ConcertSubscribeButton
                onPress={handlePressSubscribe}
                isSubscribed={!!isSubscribed}
              />
            </View>
          </>
        }
        sections={sections}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: colors.oc.gray[1].value,
    marginTop: 12,
  },
  commonContentWrapper: {
    backgroundColor: colors.oc.gray[1].value,
  },
  thumbnail: {
    width: Dimensions.get('window').width * 0.74,
    height: Dimensions.get('window').width * 0.74,
    borderRadius: 12,
    ...commonStyles.shadowBox,
  },
  subscribeButtonPosition: { position: 'absolute', right: 12, bottom: 12 },
});
