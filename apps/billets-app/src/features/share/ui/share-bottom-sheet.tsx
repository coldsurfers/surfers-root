import { withHapticPress } from '@/lib';
import { IconButton, useColorScheme } from '@coldsurfers/ocean-road/native';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import Clipboard from '@react-native-clipboard/clipboard';
import { type ReactNode, forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  shareView: ReactNode;
  shareViewRef: React.RefObject<View>;
  attributionURL?: string;
};

export const ShareBottomSheet = forwardRef<BottomSheetModal, Props>(
  ({ shareView, shareViewRef, attributionURL }, ref) => {
    const { bottom: bottomInset } = useSafeAreaInsets();
    const { semantics } = useColorScheme();
    const [isCopied, setIsCopied] = useState(false);

    const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

    const onPressCopyLink = useCallback(() => {
      Clipboard.setString(attributionURL ?? '');
      setIsCopied(true);
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
      timeoutId.current = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }, [attributionURL]);

    useEffect(() => {
      return () => {
        if (timeoutId.current) {
          clearTimeout(timeoutId.current);
        }
      };
    }, []);

    return (
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={ref}
          handleStyle={{
            backgroundColor: semantics.background[2],
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
          handleIndicatorStyle={{
            backgroundColor: semantics.foreground[1],
          }}
          backgroundStyle={{
            backgroundColor: semantics.background[2],
          }}
        >
          <BottomSheetView
            style={{
              paddingBottom: bottomInset,
              backgroundColor: semantics.background[2],
            }}
          >
            <View style={{ alignItems: 'center' }}>{shareView}</View>
            <View
              style={{
                flexDirection: 'row',
                gap: 12,
                marginTop: 12,
                alignItems: 'center',
                borderTopWidth: 1,
                borderTopColor: semantics.border[1],
                paddingHorizontal: 24,
                paddingVertical: 12,
              }}
            >
              <IconButton
                onPress={withHapticPress(onPressCopyLink)}
                icon={isCopied ? 'Check' : 'Link2'}
                size="lg"
                strokeWidth={2.5}
                style={{
                  backgroundColor: semantics.background[3],
                  width: 48,
                  height: 48,
                }}
              />
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    );
  }
);
