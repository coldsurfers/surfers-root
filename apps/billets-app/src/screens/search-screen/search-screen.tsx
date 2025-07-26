import {
  ConcertMapView,
  getZoomLevel,
  type mapPointSchema,
  useMapRegionWithZoomLevel,
  useUserCurrentLocationStore,
} from '@/features';
import {
  type SearchStoreLocationConcert,
  type SearchStoreSnapIndex,
  getViewMode,
  useSearchStore,
} from '@/features/search/store';
import { FULLY_EXPANDED_SNAP_INDEX } from '@/features/search/store/search-store.constants';
import { useBottomTab, withHapticPress } from '@/lib';
import { useUIStore } from '@/lib/stores';
import { CommonScreenLayout } from '@/ui/common-screen-layout';
import { NAVIGATION_HEADER_HEIGHT } from '@/ui/navigation-header';
import { SearchBottomList, type SearchBottomListProps } from '@/ui/search-bottom-list';
import { SearchScreenNavigationHeader } from '@/ui/search-screen-navigation-header';
import { SEARCH_DIM_HEIGHT_FLAG } from '@/ui/search.ui.constants';
import { Button, Text, useColorScheme } from '@coldsurfers/ocean-road/native';
import BottomSheet, { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useFocusEffect } from '@react-navigation/native';
import { useDebounce } from '@uidotdev/usehooks';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BackHandler, Keyboard, Pressable, StyleSheet } from 'react-native';
import type MapView from 'react-native-maps';
import type { Region } from 'react-native-maps';
import Animated, {
  interpolateColor,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { z } from 'zod';
import { useShallow } from 'zustand/shallow';

const AnimatedButton = Animated.createAnimatedComponent(Button);

export const SearchScreen = () => {
  const { semantics } = useColorScheme();
  const { top: topInset } = useSafeAreaInsets();
  const { tabBarHeight } = useBottomTab();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const bottomBtnOpacityValue = useSharedValue(1.0);
  const DEFAULT_BOTTOM_BTN_BOTTOM_VALUE = 12 + tabBarHeight;
  const bottomBtnBottomValue = useSharedValue(DEFAULT_BOTTOM_BTN_BOTTOM_VALUE);
  const [floatingBtnVisible, setFloatingBtnVisible] = useState(Boolean(FULLY_EXPANDED_SNAP_INDEX));
  const snapPoints = useMemo(() => ['30%', '100%'], []);

  const mapRef = useRef<MapView | null>(null);
  const { keyword: searchKeyword } = useSearchStore(
    useShallow((state) => ({
      keyword: state.keyword,
      setKeyword: state.setKeyword,
    }))
  );
  const { setSelectedLocationFilter, selectedLocationFilter } = useSearchStore(
    useShallow((state) => ({
      setSelectedLocationFilter: state.setSelectedLocationFilter,
      selectedLocationFilter: state.selectedLocationFilter,
    }))
  );
  const { viewMode, setViewMode, snapIndex, setSnapIndex } = useSearchStore(
    useShallow((state) => ({
      viewMode: state.viewMode,
      setViewMode: state.setViewMode,
      snapIndex: state.snapIndex,
      setSnapIndex: state.setSnapIndex,
    }))
  );
  const { locationConcerts, setLocationConcerts } = useSearchStore(
    useShallow((state) => ({
      locationConcerts: state.locationConcerts,
      setLocationConcerts: state.setLocationConcerts,
    }))
  );

  const { hideBottomTabBar, showBottomTabBar } = useUIStore(
    useShallow((state) => ({
      hideBottomTabBar: state.hideBottomTabBar,
      showBottomTabBar: state.showBottomTabBar,
    }))
  );

  const [pointsLength, setPointsLength] = useState(0);
  const debouncedSearchKeyword = useDebounce(searchKeyword, 350);

  const { latitude, longitude } = useUserCurrentLocationStore(
    useShallow((state) => ({
      latitude: state.latitude ? +`${state.latitude}`.substring(0, 7) : null,
      longitude: state.longitude ? +`${state.longitude}`.substring(0, 8) : null,
    }))
  );

  const { mapRegionWithZoomLevel, setMapRegionWithZoomLevel, initialize } =
    useMapRegionWithZoomLevel({
      latitude: latitude ?? 37.78825,
      longitude: longitude ?? -122.4324,
    });

  useEffect(() => {
    const keyboardWillShowEmitterSubscription = Keyboard.addListener('keyboardWillShow', (e) => {
      bottomBtnBottomValue.value = withTiming(e.endCoordinates.height + 12, { duration: 250 });
    });
    const keyboardWillHideEmitterSubscription = Keyboard.addListener('keyboardWillHide', () => {
      bottomBtnBottomValue.value = withTiming(DEFAULT_BOTTOM_BTN_BOTTOM_VALUE, { duration: 250 });
    });

    return () => {
      keyboardWillShowEmitterSubscription.remove();
      keyboardWillHideEmitterSubscription.remove();
    };
  }, [DEFAULT_BOTTOM_BTN_BOTTOM_VALUE, bottomBtnBottomValue]);

  useEffect(() => {
    const visible = snapIndex === FULLY_EXPANDED_SNAP_INDEX;
    const preUpdate = () => {
      if (visible) {
        setFloatingBtnVisible(true);
      }
    };
    preUpdate();
    bottomBtnOpacityValue.value = withTiming(visible ? 1.0 : 0.0, { duration: 200 }, (finished) => {
      if (finished) {
        runOnJS(setFloatingBtnVisible)(visible);
      }
    });
  }, [bottomBtnOpacityValue, snapIndex]);

  useFocusEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (snapIndex === 0) {
        setSnapIndex(FULLY_EXPANDED_SNAP_INDEX);
        return true;
      }

      return false;
    });
    return () => backHandler.remove();
  });

  const onPressMapFloatingBtn = useCallback(() => {
    setSnapIndex(0);
    setSelectedLocationFilter('map-location');
    setViewMode('map');
    hideBottomTabBar();
  }, [hideBottomTabBar, setSelectedLocationFilter, setSnapIndex, setViewMode]);
  const floatingBtnOpacityStyle = useAnimatedStyle(() => ({
    opacity: bottomBtnOpacityValue.value,
    bottom: bottomBtnBottomValue.value,
  }));

  const onChangeBottomSheet = useCallback(
    (index: number) => {
      setSnapIndex(index as SearchStoreSnapIndex);
      const viewMode = getViewMode(index as SearchStoreSnapIndex);
      if (viewMode === 'map') {
        setSelectedLocationFilter('map-location');
        setViewMode(viewMode);
        hideBottomTabBar();
      } else {
        setViewMode('list');
        showBottomTabBar();
      }
    },
    [hideBottomTabBar, setSelectedLocationFilter, setSnapIndex, setViewMode, showBottomTabBar]
  );

  const onChangeVisiblePoints = useCallback((points: z.TypeOf<typeof mapPointSchema>[]) => {
    setPointsLength(points.length);
  }, []);
  const onChangeLocationConcerts = useCallback(
    (concerts: SearchStoreLocationConcert[]) => {
      setLocationConcerts(concerts);
    },
    [setLocationConcerts]
  );

  const onRegionChangeComplete = useCallback(
    (region: Region) => {
      setMapRegionWithZoomLevel({
        ...region,
        zoomLevel: getZoomLevel(region.latitudeDelta),
      });
    },
    [setMapRegionWithZoomLevel]
  );

  useEffect(() => {
    if (selectedLocationFilter === 'current-location' || selectedLocationFilter === null) {
      mapRef.current?.animateToRegion(
        initialize({
          latitude: latitude ?? 37.78825,
          longitude: longitude ?? -122.4324,
        })
      );
      setLocationConcerts(null);
    }
    if (selectedLocationFilter === 'map-location') {
      Keyboard.dismiss();
    }
  }, [initialize, latitude, longitude, selectedLocationFilter, setLocationConcerts]);

  // Animated position
  const animatedPosition = useSharedValue(0);

  // Listen to position changes in real time
  useAnimatedReaction(
    () => animatedPosition.value,
    () => {
      // console.log('Current position (Y-axis):', position)
      // runOnJS(setShouldShowMapView)(position > 0)
    }
  );

  // Dynamic backdrop color (optional)
  const animatedBackdropStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      animatedPosition.value,
      [0, SEARCH_DIM_HEIGHT_FLAG],
      /**
       * oc gray 1
       */
      [semantics.background[2], 'rgba(0, 0, 0, 0)'] // From original color to dimmed black overlay
    );

    return {
      backgroundColor,
      display: animatedPosition.value >= SEARCH_DIM_HEIGHT_FLAG ? 'none' : 'flex',
    };
  });

  const renderBackdrop = useCallback(
    () => (
      <Animated.View
        style={[
          animatedBackdropStyle,
          {
            marginTop: NAVIGATION_HEADER_HEIGHT + topInset,
            ...StyleSheet.absoluteFillObject,
          },
        ]}
      />
    ),
    [animatedBackdropStyle, topInset]
  );

  const bottomListProps = useMemo<SearchBottomListProps>(() => {
    if (debouncedSearchKeyword) {
      return {
        type: 'search',
        keyword: debouncedSearchKeyword,
      };
    }
    if (selectedLocationFilter === 'map-location') {
      return {
        type: 'map',
        events: locationConcerts ?? [],
      };
    }
    return {
      type: 'default',
    };
  }, [debouncedSearchKeyword, locationConcerts, selectedLocationFilter]);

  return (
    <BottomSheetModalProvider>
      <SearchScreenNavigationHeader animatedPosition={animatedPosition} />
      <CommonScreenLayout edges={['bottom']} style={styles.wrapper}>
        <ConcertMapView
          ref={mapRef}
          mapRegionWithZoomLevel={mapRegionWithZoomLevel}
          onChangeVisiblePoints={onChangeVisiblePoints}
          onChangeLocationConcerts={onChangeLocationConcerts}
          onRegionChangeComplete={onRegionChangeComplete}
        />
        <BottomSheet
          ref={bottomSheetRef}
          index={snapIndex}
          onChange={onChangeBottomSheet}
          snapPoints={snapPoints}
          enablePanDownToClose={false}
          enableHandlePanningGesture={!searchKeyword}
          enableContentPanningGesture={!searchKeyword}
          handleComponent={null}
          animatedPosition={animatedPosition}
          animateOnMount={false}
          style={{
            marginTop: NAVIGATION_HEADER_HEIGHT + topInset,
          }}
          backdropComponent={renderBackdrop}
        >
          {viewMode === 'list' ? (
            <SearchBottomList {...bottomListProps} />
          ) : (
            <Pressable
              onPress={() => bottomSheetRef.current?.snapToIndex(FULLY_EXPANDED_SNAP_INDEX)}
              style={[
                styles.guideBox,
                {
                  backgroundColor: semantics.background[3],
                },
              ]}
            >
              <Text weight="bold" style={[styles.guideFont, { color: semantics.foreground[1] }]}>
                이 지역의 공연 수 {pointsLength}개
              </Text>
            </Pressable>
          )}
        </BottomSheet>
      </CommonScreenLayout>
      {floatingBtnVisible && !searchKeyword && (
        <AnimatedButton
          theme="border"
          style={[
            styles.floatingButton,
            floatingBtnOpacityStyle,
            {
              backgroundColor: semantics.background['5'],
            },
          ]}
          onPress={withHapticPress(onPressMapFloatingBtn)}
        >
          <Text weight="bold" style={{ color: semantics.foreground[3], fontSize: 14 }}>
            맵으로 보기
          </Text>
        </AnimatedButton>
      )}
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  list: { flex: 1 },
  contentContainer: {
    flexGrow: 1,
    paddingVertical: 12,
    paddingBottom: 120,
    paddingHorizontal: 14,
  },
  emptyWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  itemInnerRight: {
    marginLeft: 8,
  },
  emptyEmoji: { fontSize: 28 },
  emptyDesc: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 12,
  },
  topInputWrapper: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  floatingButton: { width: 120, alignSelf: 'center', position: 'absolute', right: 0 },
  guideBox: { flex: 1, paddingHorizontal: 14, paddingTop: 16 },
  guideFont: {
    fontSize: 16,
  },
});
