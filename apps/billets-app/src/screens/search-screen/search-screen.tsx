import { ConcertMapView } from '@/features'
import { useSearchStore } from '@/features/search/store'
import { SearchBottomList } from '@/features/search/ui'
import commonStyles from '@/lib/common-styles'
import { CommonScreenLayout, NAVIGATION_HEADER_HEIGHT } from '@/ui'
import { colors } from '@coldsurfers/ocean-road'
import { Button, Text } from '@coldsurfers/ocean-road/native'
import BottomSheet, { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useDebounce } from '@uidotdev/usehooks'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, KeyboardAvoidingViewProps, Platform, StyleSheet, View } from 'react-native'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useShallow } from 'zustand/shallow'
import { useUserCurrentLocationStore } from '../../lib/stores/userCurrentLocationStore'

const AnimatedButton = Animated.createAnimatedComponent(Button)

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

const FULLY_EXPANDED_SNAP_INDEX = 1

const getViewMode = (snapIndex: number) => {
  if (snapIndex === FULLY_EXPANDED_SNAP_INDEX) {
    return 'list'
  }
  return 'map'
}

export const SearchScreen = () => {
  const bottomTabBarHeight = useBottomTabBarHeight()
  const bottomSheetRef = useRef<BottomSheet>(null)
  const bottomBtnOpacityValue = useSharedValue(1.0)
  const [floatingBtnVisible, setFloatingBtnVisible] = useState(Boolean(FULLY_EXPANDED_SNAP_INDEX))
  const [snapIndex, setSnapIndex] = useState(FULLY_EXPANDED_SNAP_INDEX)
  const snapPoints = useMemo(() => ['10%', '100%'], [])
  const { keyword: searchKeyword } = useSearchStore(
    useShallow((state) => ({
      keyword: state.keyword,
    })),
  )
  const { selectedLocationFilter, setSelectedLocationFilter } = useSearchStore(
    useShallow((state) => ({
      selectedLocationFilter: state.selectedLocationFilter,
      setSelectedLocationFilter: state.setSelectedLocationFilter,
    })),
  )
  const [viewMode, setViewMode] = useState<'map' | 'list'>(getViewMode(snapIndex))
  const [pointsLength, setPointsLength] = useState(0)

  const [keyboardHeight, setKeyboardHeight] = useState(0)
  const debouncedSearchKeyword = useDebounce(searchKeyword, 350)

  const { latitude, longitude } = useUserCurrentLocationStore(
    useShallow((state) => ({
      latitude: state.latitude ? +`${state.latitude}`.substring(0, 7) : null,
      longitude: state.longitude ? +`${state.longitude}`.substring(0, 8) : null,
    })),
  )

  useEffect(() => {
    const keyboardWillShowEmitterSubscription = Keyboard.addListener('keyboardWillShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height)
    })
    const keyboardWillHideEmitterSubscription = Keyboard.addListener('keyboardWillHide', () => {
      setKeyboardHeight(0)
    })

    return () => {
      keyboardWillShowEmitterSubscription.remove()
      keyboardWillHideEmitterSubscription.remove()
    }
  }, [])

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
  }, [setSelectedLocationFilter])
  const floatingBtnOpacityStyle = useAnimatedStyle(() => ({
    opacity: bottomBtnOpacityValue.value,
  }))

  useEffect(() => {
    if (selectedLocationFilter === null) {
      setSnapIndex(FULLY_EXPANDED_SNAP_INDEX)
      setViewMode('list')
    }
  }, [selectedLocationFilter, snapIndex])

  return (
    <BottomSheetModalProvider>
      <KeyboardAvoidWrapper>
        <CommonScreenLayout style={styles.wrapper}>
          {viewMode === 'map' && (
            <ConcertMapView
              onChangeVisiblePoints={(points) => setPointsLength(points.length)}
              onChangeLocationConcerts={(concerts) => {
                console.log(concerts)
              }}
            />
          )}
          <BottomSheet
            ref={bottomSheetRef}
            index={snapIndex}
            onChange={(index) => setSnapIndex(index)}
            snapPoints={snapPoints}
            enablePanDownToClose={false}
            handleComponent={handleComponent}
            handleStyle={styles.handleStyle}
            animateOnMount={false}
          >
            {viewMode === 'list' ? (
              <SearchBottomList
                debouncedSearchKeyword={debouncedSearchKeyword}
                latitude={latitude}
                longitude={longitude}
              />
            ) : (
              <View style={{ flex: 1, backgroundColor: colors.oc.gray[1].value, paddingHorizontal: 14 }}>
                <Text weight="bold" style={styles.guideFont}>
                  이 지역의 공연 수 {pointsLength}개
                </Text>
              </View>
            )}
          </BottomSheet>
          {floatingBtnVisible && (
            <AnimatedButton
              theme="border"
              style={[
                styles.floatingButton,
                {
                  bottom: keyboardHeight > 0 ? keyboardHeight - bottomTabBarHeight : 12,
                },
                floatingBtnOpacityStyle,
              ]}
              onPress={onPressMapFloatingBtn}
            >
              맵으로 보기
            </AnimatedButton>
          )}
        </CommonScreenLayout>
      </KeyboardAvoidWrapper>
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
  guideFont: {
    fontSize: 16,
  },
})
