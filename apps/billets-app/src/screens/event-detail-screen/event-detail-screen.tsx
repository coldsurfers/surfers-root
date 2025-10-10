import {
  ConcertDetailSectionList,
  ConcertDetailVenueMapBottomSheet,
} from '@/features/concert-detail';
import { ConcertDetailShareBottomSheet } from '@/features/concert-detail/components/concert-detail-share-bottom-sheet';
import { TicketListBottomSheet } from '@/features/concert-detail/components/ticket-list-bottom-sheet/ticket-list-bottom-sheet';
import { useToggleSubscribeConcert } from '@/features/subscribe/hooks/useToggleSubscribeConcert';
import { useEffectOnce, useFirebaseAnalytics, useStoreReview } from '@/lib';
import commonStyles from '@/lib/common-styles';
import { concertDetailCountForStoreReviewStorage } from '@/lib/storage';
import { NAVIGATION_HEADER_HEIGHT } from '@/ui';
import { colors } from '@coldsurfers/ocean-road';
import { Spinner, useColorScheme } from '@coldsurfers/ocean-road/native';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { type PropsWithChildren, Suspense, useCallback, useRef } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import {
  useEventDetailScreenNavigation,
  useEventDetailScreenRoute,
} from './event-detail-screen.hooks';

const TOP_SPACE = 110;

const EventDetailScreenLayout = ({ children }: PropsWithChildren) => {
  const { semantics } = useColorScheme();
  return (
    <View
      style={{
        flex: 1,
        marginTop: -NAVIGATION_HEADER_HEIGHT,
        backgroundColor: semantics.background[3],
        paddingTop: TOP_SPACE,
      }}
    >
      {children}
    </View>
  );
};

const ScreenInner = () => {
  const { semantics } = useColorScheme();
  const { logEvent } = useFirebaseAnalytics();
  const navigation = useEventDetailScreenNavigation();
  const { params } = useEventDetailScreenRoute();
  const { requestReview } = useStoreReview();
  const ticketSheetRef = useRef<BottomSheetModal>(null);
  const shareSheetRef = useRef<BottomSheetModal>(null);

  const toggleSubscribeConcert = useToggleSubscribeConcert();

  const mapDetailBottomSheetModalRef = useRef<BottomSheetModal>(null);

  const onPressSubscribe = useCallback(
    (
      params: { isLoggedIn: false } | { isLoggedIn: true; concertId: string; isSubscribed: boolean }
    ) => {
      if (!params.isLoggedIn) {
        // show login modal
        navigation.navigate('LoginStackNavigation', {
          screen: 'LoginSelectionScreen',
          params: {},
        });
        return;
      }
      const { concertId, isSubscribed } = params;
      toggleSubscribeConcert({
        isSubscribed,
        eventId: concertId,
      });
    },
    [navigation, toggleSubscribeConcert]
  );

  useEffectOnce(() => {
    const existingCount = concertDetailCountForStoreReviewStorage.get() ?? 0;
    concertDetailCountForStoreReviewStorage.set(existingCount + 1);

    return () => {
      const count = concertDetailCountForStoreReviewStorage.get();
      if (!count) {
        return;
      }
      if (count % 10 === 0) {
        requestReview();
      }
    };
  });

  useEffectOnce(() => {
    logEvent({
      name: 'visit_event_detail',
      params: {
        event_id: params.eventId,
      },
    });
  });

  const handlePressTicketCta = () => ticketSheetRef.current?.present();
  const handlePressArtist = useCallback(
    (artistId: string) =>
      navigation.navigate('ArtistStackNavigation', {
        screen: 'ArtistDetailScreen',
        params: {
          artistId,
        },
      }),
    [navigation]
  );
  const handlePressVenueMap = () => mapDetailBottomSheetModalRef.current?.present();

  const handlePressVenueProfile = useCallback(
    (venueId: string) => {
      navigation.navigate('VenueStackNavigation', {
        screen: 'VenueDetailScreen',
        params: {
          id: venueId,
        },
      });
    },
    [navigation]
  );

  const handlePressBackdrop = () => ticketSheetRef.current?.close();
  const handlePressShare = () => shareSheetRef.current?.present();

  return (
    <EventDetailScreenLayout>
      <View style={[styles.wrapper, { backgroundColor: semantics.background[3] }]}>
        <Suspense fallback={<Spinner positionCenter />}>
          <ConcertDetailSectionList
            id={params.eventId}
            onPressTicketCta={handlePressTicketCta}
            onPressArtist={handlePressArtist}
            onPressVenueMap={handlePressVenueMap}
            onPressVenueProfile={handlePressVenueProfile}
            onPressSubscribe={onPressSubscribe}
            onPressShare={handlePressShare}
          />
        </Suspense>
      </View>
      <Suspense>
        <ConcertDetailVenueMapBottomSheet
          ref={mapDetailBottomSheetModalRef}
          eventId={params.eventId}
        />
      </Suspense>
      <Suspense>
        <TicketListBottomSheet
          ref={ticketSheetRef}
          eventId={params.eventId}
          onPressBackdrop={handlePressBackdrop}
        />
      </Suspense>
      <Suspense>
        <ConcertDetailShareBottomSheet ref={shareSheetRef} eventId={params.eventId} />
      </Suspense>
    </EventDetailScreenLayout>
  );
};

export const EventDetailScreen = () => {
  return (
    <Suspense
      fallback={
        <EventDetailScreenLayout>
          <Spinner positionCenter />
        </EventDetailScreenLayout>
      }
    >
      <ScreenInner />
    </Suspense>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.oc.gray[1].value,
  },
  fixedBottom: {
    backgroundColor: colors.oc.white.value,
    paddingTop: 14,
    paddingBottom: 14,
    paddingHorizontal: 14,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    ...commonStyles.shadowBox,
  },
  imageViewerCloseButton: { position: 'absolute', zIndex: 99, right: 12 },
  imageViewerCloseText: { color: colors.oc.white.value },
  venueMap: {
    width: Dimensions.get('screen').width - 12 * 2,
    height: 350,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 8,
    marginTop: 4,
  },
  ticketBtn: {
    backgroundColor: colors.oc.cyan[8].value,
  },
});
