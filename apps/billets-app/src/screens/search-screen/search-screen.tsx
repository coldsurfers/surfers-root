import {
  ConcertMapView,
  getZoomLevel,
  mapPointSchema,
  useMapRegionWithZoomLevel,
  useUserCurrentLocationStore,
} from '@/features'
import {
  getSearchFilterUIValue,
  getViewMode,
  SearchStoreLocationConcert,
  SearchStoreSnapIndex,
  useSearchStore,
} from '@/features/search/store'
import { FULLY_EXPANDED_SNAP_INDEX } from '@/features/search/store/search-store.constants'
import { SearchBottomList } from '@/features/search/ui'
import { useBottomTab } from '@/lib'
import commonStyles from '@/lib/common-styles'
import { useUIStore } from '@/lib/stores'
import { CommonScreenLayout, NAVIGATION_HEADER_HEIGHT } from '@/ui'
import { colors } from '@coldsurfers/ocean-road'
import { Button, Text, TextInput } from '@coldsurfers/ocean-road/native'
import BottomSheet, { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { useDebounce } from '@uidotdev/usehooks'
import { X as XIcon } from 'lucide-react-native'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Keyboard, Pressable, StyleSheet, View } from 'react-native'
import MapView, { Region } from 'react-native-maps'
import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { z } from 'zod'
import { useShallow } from 'zustand/shallow'

const AnimatedButton = Animated.createAnimatedComponent(Button)

const DIM_HEIGHT_FLAG = 300

export const SearchScreen = () => {
  const { top: topInset } = useSafeAreaInsets()
  const { tabBarHeight } = useBottomTab()
  const bottomSheetRef = useRef<BottomSheet>(null)
  const bottomBtnOpacityValue = useSharedValue(1.0)
  const DEFAULT_BOTTOM_BTN_BOTTOM_VALUE = 12 + tabBarHeight
  const bottomBtnBottomValue = useSharedValue(DEFAULT_BOTTOM_BTN_BOTTOM_VALUE)
  const [floatingBtnVisible, setFloatingBtnVisible] = useState(Boolean(FULLY_EXPANDED_SNAP_INDEX))
  const snapPoints = useMemo(() => ['35%', '100%'], [])

  const mapRef = useRef<MapView | null>(null)
  const [placeholder, setPlaceholder] = useState('🔎 어떤 공연을 찾고 싶으세요?')
  const { keyword: searchKeyword, setKeyword: setSearchKeyword } = useSearchStore(
    useShallow((state) => ({
      keyword: state.keyword,
      setKeyword: state.setKeyword,
    })),
  )
  const { setSelectedLocationFilter, selectedLocationFilter } = useSearchStore(
    useShallow((state) => ({
      setSelectedLocationFilter: state.setSelectedLocationFilter,
      selectedLocationFilter: state.selectedLocationFilter,
    })),
  )
  const { viewMode, setViewMode, snapIndex, setSnapIndex } = useSearchStore(
    useShallow((state) => ({
      viewMode: state.viewMode,
      setViewMode: state.setViewMode,
      snapIndex: state.snapIndex,
      setSnapIndex: state.setSnapIndex,
    })),
  )
  const { locationConcerts, setLocationConcerts } = useSearchStore(
    useShallow((state) => ({
      locationConcerts: state.locationConcerts,
      setLocationConcerts: state.setLocationConcerts,
    })),
  )

  const { hideBottomTabBar, showBottomTabBar } = useUIStore(
    useShallow((state) => ({
      hideBottomTabBar: state.hideBottomTabBar,
      showBottomTabBar: state.showBottomTabBar,
    })),
  )

  const [pointsLength, setPointsLength] = useState(0)
  const debouncedSearchKeyword = useDebounce(searchKeyword, 350)

  const { latitude, longitude } = useUserCurrentLocationStore(
    useShallow((state) => ({
      latitude: state.latitude ? +`${state.latitude}`.substring(0, 7) : null,
      longitude: state.longitude ? +`${state.longitude}`.substring(0, 8) : null,
    })),
  )

  const { mapRegionWithZoomLevel, setMapRegionWithZoomLevel, initialize } = useMapRegionWithZoomLevel({
    latitude: latitude ?? 37.78825,
    longitude: longitude ?? -122.4324,
  })

  useEffect(() => {
    const keyboardWillShowEmitterSubscription = Keyboard.addListener('keyboardWillShow', (e) => {
      bottomBtnBottomValue.value = withTiming(e.endCoordinates.height + 12, { duration: 250 })
    })
    const keyboardWillHideEmitterSubscription = Keyboard.addListener('keyboardWillHide', () => {
      bottomBtnBottomValue.value = withTiming(DEFAULT_BOTTOM_BTN_BOTTOM_VALUE, { duration: 250 })
    })

    return () => {
      keyboardWillShowEmitterSubscription.remove()
      keyboardWillHideEmitterSubscription.remove()
    }
  }, [DEFAULT_BOTTOM_BTN_BOTTOM_VALUE, bottomBtnBottomValue])

  useEffect(() => {
    const visible = snapIndex === FULLY_EXPANDED_SNAP_INDEX
    const preUpdate = () => {
      if (visible) {
        setFloatingBtnVisible(true)
      }
    }
    preUpdate()
    bottomBtnOpacityValue.value = withTiming(visible ? 1.0 : 0.0, { duration: 200 }, (finished) => {
      if (finished) {
        runOnJS(setFloatingBtnVisible)(visible)
      }
    })
  }, [bottomBtnOpacityValue, snapIndex])

  // const handleComponent = useMemo(() => {
  //   return snapIndex === FULLY_EXPANDED_SNAP_INDEX ? null : undefined
  // }, [snapIndex])
  const onPressMapFloatingBtn = useCallback(() => {
    setSnapIndex(0)
    setSelectedLocationFilter('map-location')
    setViewMode('map')
    hideBottomTabBar()
  }, [hideBottomTabBar, setSelectedLocationFilter, setSnapIndex, setViewMode])
  const floatingBtnOpacityStyle = useAnimatedStyle(() => ({
    opacity: bottomBtnOpacityValue.value,
    bottom: bottomBtnBottomValue.value,
  }))

  const initializeState = useCallback(() => {
    setSelectedLocationFilter(null)
    setSnapIndex(FULLY_EXPANDED_SNAP_INDEX)
    setViewMode('list')
    setLocationConcerts([])
  }, [setLocationConcerts, setSelectedLocationFilter, setSnapIndex, setViewMode])

  const onChangeText = useCallback(
    (text: string) => {
      setSearchKeyword(text)
      initializeState()
    },
    [initializeState, setSearchKeyword],
  )

  const onPressFilterXIcon = useCallback(() => {
    initializeState()
  }, [initializeState])

  const onChangeBottomSheet = useCallback(
    (index: number) => {
      setSnapIndex(index as SearchStoreSnapIndex)
      const viewMode = getViewMode(index as SearchStoreSnapIndex)
      if (viewMode === 'map') {
        setSelectedLocationFilter('map-location')
        setViewMode(viewMode)
        hideBottomTabBar()
      } else {
        setViewMode('list')
        showBottomTabBar()
      }
    },
    [hideBottomTabBar, setSelectedLocationFilter, setSnapIndex, setViewMode, showBottomTabBar],
  )

  const onChangeVisiblePoints = useCallback((points: z.TypeOf<typeof mapPointSchema>[]) => {
    setPointsLength(points.length)
  }, [])
  const onChangeLocationConcerts = useCallback(
    (concerts: SearchStoreLocationConcert[]) => {
      setLocationConcerts(concerts)
    },
    [setLocationConcerts],
  )

  const onRegionChangeComplete = useCallback(
    (region: Region) => {
      setMapRegionWithZoomLevel({
        ...region,
        zoomLevel: getZoomLevel(region.latitudeDelta),
      })
    },
    [setMapRegionWithZoomLevel],
  )

  useEffect(() => {
    if (selectedLocationFilter === 'current-location' || selectedLocationFilter === null) {
      mapRef.current?.animateToRegion(
        initialize({
          latitude: latitude ?? 37.78825,
          longitude: longitude ?? -122.4324,
        }),
      )
      setLocationConcerts(null)
    }
    if (selectedLocationFilter === 'map-location') {
      Keyboard.dismiss()
    }
  }, [initialize, latitude, longitude, selectedLocationFilter, setLocationConcerts])

  // Animated position
  const animatedPosition = useSharedValue(0)

  // Listen to position changes in real time
  useAnimatedReaction(
    () => animatedPosition.value,
    (position) => {
      // console.log('Current position (Y-axis):', position)
      // runOnJS(setShouldShowMapView)(position > 0)
    },
  )

  // Dynamic backdrop color (optional)
  const animatedBackdropStyle = useAnimatedStyle(() => {
    const dimOpacity = interpolate(
      animatedPosition.value, // Current Y position of the BottomSheet
      [0, DIM_HEIGHT_FLAG], // Input range: position values
      [1.0, 0], // Output range: opacity (0: no dim, 0.5: half dim)
    )

    return {
      backgroundColor: colors.oc.black.value, // Fixed color for dimming
      opacity: dimOpacity, // Dynamic opacity
      display: animatedPosition.value >= DIM_HEIGHT_FLAG ? 'none' : 'flex',
    }
  })

  const animatedHeaderStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      animatedPosition.value,
      [0, DIM_HEIGHT_FLAG],
      /**
       * oc gray 1
       */
      ['#f1f3f5', 'rgba(0, 0, 0, 0)'], // From original color to dimmed black overlay
    )

    return {
      backgroundColor,
    }
  })

  return (
    <BottomSheetModalProvider>
      <Animated.View
        style={[
          {
            height: NAVIGATION_HEADER_HEIGHT + topInset,
            position: 'absolute',
            paddingTop: topInset + 10,
            top: 0,
            left: 0,
            right: 0,
            zIndex: 99,
          },
          animatedHeaderStyle,
        ]}
      >
        <TextInput
          value={searchKeyword}
          onChangeText={onChangeText}
          onFocus={() => setPlaceholder('')}
          onBlur={() => setPlaceholder('🔎 어떤 공연을 찾고 싶으세요?')}
          autoCapitalize="none"
          placeholder={placeholder}
          clearButtonMode="while-editing"
          style={{
            marginHorizontal: 14,
          }}
        />
        <View style={styles.filters}>
          {selectedLocationFilter !== null && (
            <Button size="sm" theme="border" style={styles.filterBtn}>
              <Text style={styles.filterText}>{getSearchFilterUIValue(selectedLocationFilter)}</Text>
              {selectedLocationFilter !== 'current-location' && (
                <Pressable
                  hitSlop={{
                    top: 8,
                    left: 8,
                    right: 8,
                    bottom: 8,
                  }}
                  onPress={onPressFilterXIcon}
                  style={styles.filterXIconBtn}
                >
                  <XIcon size={14} color={colors.oc.black.value} strokeWidth={3} />
                </Pressable>
              )}
            </Button>
          )}
        </View>
      </Animated.View>
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
            marginTop: NAVIGATION_HEADER_HEIGHT + topInset - 1,
          }}
          backdropComponent={() => (
            <Animated.View
              style={[
                {
                  ...StyleSheet.absoluteFillObject,
                },
                animatedBackdropStyle,
                {
                  marginTop: NAVIGATION_HEADER_HEIGHT + topInset - 1,
                },
              ]}
            />
          )}
        >
          {viewMode === 'list' ? (
            <SearchBottomList
              debouncedSearchKeyword={debouncedSearchKeyword}
              latitude={latitude}
              longitude={longitude}
              locationConcerts={locationConcerts}
              selectedLocationFilter={selectedLocationFilter}
            />
          ) : (
            <View style={styles.guideBox}>
              <Text weight="bold" style={styles.guideFont}>
                이 지역의 공연 수 {pointsLength}개
              </Text>
            </View>
          )}
        </BottomSheet>
      </CommonScreenLayout>
      {floatingBtnVisible && !searchKeyword && (
        <AnimatedButton
          theme="border"
          style={[styles.floatingButton, floatingBtnOpacityStyle]}
          onPress={onPressMapFloatingBtn}
        >
          맵으로 보기
        </AnimatedButton>
      )}
    </BottomSheetModalProvider>
  )
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  list: { flex: 1 },
  contentContainer: {
    flexGrow: 1,
    paddingVertical: 12,
    paddingBottom: 120,
    paddingHorizontal: 14,
    backgroundColor: colors.oc.gray[1].value,
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
  handleStyle: {
    backgroundColor: colors.oc.gray[1].value,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    ...commonStyles.topShadowBox,
  },
  guideBox: { flex: 1, backgroundColor: colors.oc.gray[1].value, paddingHorizontal: 14, paddingTop: 16 },
  guideFont: {
    fontSize: 16,
  },
  filters: {
    marginTop: 8,
    marginHorizontal: 14,
  },
  filterText: { fontSize: 12 },
  filterXIconBtn: { marginLeft: 4 },
  filterBtn: {
    alignSelf: 'baseline',
    flexDirection: 'row',
    alignItems: 'center',
  },
})
