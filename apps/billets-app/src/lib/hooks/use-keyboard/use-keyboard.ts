import { NAVIGATION_HEADER_HEIGHT } from '@/ui/navigation-header'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function useKeyboard() {
  const { top: topInset, bottom: bottomInset } = useSafeAreaInsets()
  const bottomTabBarHeight = useBottomTabBarHeight()
  const defaultBottomPadding = NAVIGATION_HEADER_HEIGHT + topInset - 1 + bottomTabBarHeight + bottomInset
  const [bottomPadding, setBottomPadding] = useState(defaultBottomPadding)

  useEffect(() => {
    const keyboardWillShowEmitterSubscription = Keyboard.addListener('keyboardWillShow', (e) => {
      setBottomPadding(e.endCoordinates.height + 12 + defaultBottomPadding)
    })
    const keyboardWillHideEmitterSubscription = Keyboard.addListener('keyboardWillHide', () => {
      setBottomPadding(defaultBottomPadding)
    })

    return () => {
      keyboardWillShowEmitterSubscription.remove()
      keyboardWillHideEmitterSubscription.remove()
    }
  }, [bottomInset, bottomPadding, defaultBottomPadding, topInset])

  return {
    bottomPadding,
  }
}
