import { withHapticPress } from '@/lib';
import { IconButton, Text, useColorScheme } from '@coldsurfers/ocean-road/native';
import {
  BottomSheetBackdrop,
  type BottomSheetBackgroundProps,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import Clipboard from '@react-native-clipboard/clipboard';
import { type ReactNode, forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { shareMore } from '../share.utils';

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

    const renderBackdrop = useCallback((props: BottomSheetBackgroundProps) => {
      return <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />;
    }, []);

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
            backgroundColor: semantics.background[3],
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
          handleIndicatorStyle={{
            backgroundColor: semantics.foreground[1],
          }}
          backgroundStyle={{
            backgroundColor: semantics.background[3],
          }}
          backdropComponent={renderBackdrop}
        >
          <BottomSheetView
            style={{
              paddingBottom: bottomInset,
              backgroundColor: semantics.background[3],
            }}
          >
            <View style={{ alignItems: 'center' }}>{shareView}</View>
            <View
              style={{
                flexDirection: 'row',
                gap: 18,
                marginTop: 12,
                alignItems: 'center',
                borderTopWidth: 1,
                borderTopColor: semantics.border[1],
                paddingHorizontal: 24,
                paddingVertical: 12,
              }}
            >
              <View style={{ alignItems: 'center' }}>
                <IconButton
                  onPress={withHapticPress(onPressCopyLink)}
                  icon={isCopied ? 'Check' : 'Link2'}
                  size="lg"
                  strokeWidth={2.5}
                  color={semantics.foreground[1]}
                  style={{
                    backgroundColor: semantics.background[2],
                    width: 48,
                    height: 48,
                  }}
                  fill={'transparent'}
                />
                <Text style={{ color: semantics.foreground[1], marginTop: 8, fontSize: 14 }}>
                  링크 복사
                </Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <IconButton
                  onPress={withHapticPress(() => shareMore({ url: attributionURL ?? '' }))}
                  icon={'Ellipsis'}
                  size="lg"
                  strokeWidth={2.5}
                  color={semantics.foreground[1]}
                  style={{
                    backgroundColor: semantics.background[2],
                    width: 48,
                    height: 48,
                  }}
                  fill={'transparent'}
                />
                <Text style={{ color: semantics.foreground[1], marginTop: 8, fontSize: 14 }}>
                  더보기
                </Text>
              </View>
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    );
  }
);
