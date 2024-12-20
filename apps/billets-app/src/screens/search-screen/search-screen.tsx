import { ConcertMapView, mapPointSchema, useUserCurrentLocationStore } from '@/features'
import { getViewMode, SearchStoreLocationConcert, SearchStoreSnapIndex, useSearchStore } from '@/features/search/store'
import { FULLY_EXPANDED_SNAP_INDEX } from '@/features/search/store/search-store.constants'
import { SearchBottomList } from '@/features/search/ui'
import commonStyles from '@/lib/common-styles'
import { useUIStore } from '@/lib/stores'
import { CommonScreenLayout, NAVIGATION_HEADER_HEIGHT } from '@/ui'
import { colors } from '@coldsurfers/ocean-road'
import { Button, Text } from '@coldsurfers/ocean-road/native'
import BottomSheet, { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useDebounce } from '@uidotdev/usehooks'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, KeyboardAvoidingViewProps, Platform, StyleSheet, View } from 'react-native'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { z } from 'zod'
import { useShallow } from 'zustand/shallow'

const AnimatedButton = Animated.createAnimatedComponent(Button)

const DEFAULT_BOTTOM_BTN_BOTTOM_VALUE = 12

const KeyboardAvoidWrapper = (props: KeyboardAvoidingViewProps) => {
  return (
    <KeyboardAvoidingView
      {...props}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={NAVIGATION_HEADER_HEIGHT}
      style={{ flex: 1 }}
    />
  )
}

export const SearchScreen = () => {
  const bottomTabBarHeight = useBottomTabBarHeight()
  const bottomSheetRef = useRef<BottomSheet>(null)
  const bottomBtnOpacityValue = useSharedValue(1.0)
  const bottomBtnBottomValue = useSharedValue(DEFAULT_BOTTOM_BTN_BOTTOM_VALUE)
  const [floatingBtnVisible, setFloatingBtnVisible] = useState(Boolean(FULLY_EXPANDED_SNAP_INDEX))
  const snapPoints = useMemo(() => ['10%', '100%'], [])
  const { keyword: searchKeyword } = useSearchStore(
    useShallow((state) => ({
      keyword: state.keyword,
    })),
  )
  const { setSelectedLocationFilter } = useSearchStore(
    useShallow((state) => ({
      setSelectedLocationFilter: state.setSelectedLocationFilter,
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

  useEffect(() => {
    const keyboardWillShowEmitterSubscription = Keyboard.addListener('keyboardWillShow', (e) => {
      bottomBtnBottomValue.value = withTiming(e.endCoordinates.height - bottomTabBarHeight, { duration: 250 })
    })
    const keyboardWillHideEmitterSubscription = Keyboard.addListener('keyboardWillHide', () => {
      bottomBtnBottomValue.value = withTiming(DEFAULT_BOTTOM_BTN_BOTTOM_VALUE, { duration: 250 })
    })

    return () => {
      keyboardWillShowEmitterSubscription.remove()
      keyboardWillHideEmitterSubscription.remove()
    }
  }, [bottomBtnBottomValue, bottomTabBarHeight])

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

  const handleComponent = useMemo(() => {
    return snapIndex === FULLY_EXPANDED_SNAP_INDEX ? null : undefined
  }, [snapIndex])
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

  return (
    <BottomSheetModalProvider>
      <KeyboardAvoidWrapper>
        <CommonScreenLayout style={styles.wrapper}>
          {viewMode === 'map' && (
            <ConcertMapView
              onChangeVisiblePoints={onChangeVisiblePoints}
              onChangeLocationConcerts={onChangeLocationConcerts}
            />
          )}
          <BottomSheet
            ref={bottomSheetRef}
            index={snapIndex}
            onChange={onChangeBottomSheet}
            snapPoints={snapPoints}
            enablePanDownToClose={false}
            enableHandlePanningGesture={!searchKeyword}
            enableContentPanningGesture={!searchKeyword}
            handleComponent={handleComponent}
            handleStyle={styles.handleStyle}
            animateOnMount={false}
          >
            {viewMode === 'list' ? (
              <SearchBottomList
                debouncedSearchKeyword={debouncedSearchKeyword}
                latitude={latitude}
                longitude={longitude}
                locationConcerts={locationConcerts}
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
      </KeyboardAvoidWrapper>
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
  guideBox: { flex: 1, backgroundColor: colors.oc.gray[1].value, paddingHorizontal: 14 },
  guideFont: {
    fontSize: 16,
  },
})
