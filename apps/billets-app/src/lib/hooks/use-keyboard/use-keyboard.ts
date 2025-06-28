import { NAVIGATION_HEADER_HEIGHT } from '@/ui/navigation-header';
import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBottomTab } from '../use-bottom-tab';

export function useKeyboard() {
  const { top: topInset, bottom: bottomInset } = useSafeAreaInsets();
  const { tabBarHeight } = useBottomTab();
  const defaultBottomPadding = NAVIGATION_HEADER_HEIGHT + topInset + tabBarHeight + bottomInset;
  const [bottomPadding, setBottomPadding] = useState(defaultBottomPadding);

  useEffect(() => {
    const keyboardWillShowEmitterSubscription = Keyboard.addListener('keyboardWillShow', (e) => {
      setBottomPadding(e.endCoordinates.height + 12 + defaultBottomPadding);
    });
    const keyboardWillHideEmitterSubscription = Keyboard.addListener('keyboardWillHide', () => {
      setBottomPadding(defaultBottomPadding);
    });

    return () => {
      keyboardWillShowEmitterSubscription.remove();
      keyboardWillHideEmitterSubscription.remove();
    };
  }, [defaultBottomPadding]);

  return {
    bottomPadding,
  };
}
