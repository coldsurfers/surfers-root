import { ConcertMapView } from '@/features'
import { useSearchStore } from '@/features/search/store'
import { SearchBottomKeywordResultList, SearchDefaultBottomResultList } from '@/features/search/ui'
import { CommonScreenLayout, NAVIGATION_HEADER_HEIGHT } from '@/ui'
import { colors } from '@coldsurfers/ocean-road'
import { Button } from '@coldsurfers/ocean-road/native'
import BottomSheet, { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useDebounce } from '@uidotdev/usehooks'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, KeyboardAvoidingViewProps, Platform, StyleSheet } from 'react-native'
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

  const handleComponent = useMemo(() => null, [])
  const onPressMapFloatingBtn = useCallback(() => setSnapIndex(0), [])
  const floatingBtnOpacityStyle = useAnimatedStyle(() => ({
    opacity: bottomBtnOpacityValue.value,
  }))

  return (
    <BottomSheetModalProvider>
      <KeyboardAvoidWrapper>
        <CommonScreenLayout style={styles.wrapper}>
          <ConcertMapView />
          <BottomSheet
            ref={bottomSheetRef}
            index={snapIndex}
            onChange={(index) => setSnapIndex(index)}
            snapPoints={snapPoints}
            enablePanDownToClose={false}
            handleComponent={handleComponent}
            animateOnMount={false}
          >
            {debouncedSearchKeyword ? (
              <SearchBottomKeywordResultList keyword={debouncedSearchKeyword} />
            ) : (
              <SearchDefaultBottomResultList latitude={latitude} longitude={longitude} />
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
})
