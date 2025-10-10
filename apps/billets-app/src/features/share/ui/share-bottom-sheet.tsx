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
import type { icons } from 'lucide-react-native';
import {
  type ReactNode,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FlatList, type ListRenderItem, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { shareInstagram, shareMore, shareTwitter } from '../share.utils';

type Props = {
  shareView: ReactNode;
  shareViewRef: React.RefObject<View>;
  attributionURL?: string;
  text?: string;
};

export const ShareBottomSheet = forwardRef<BottomSheetModal, Props>(
  ({ shareView, shareViewRef, attributionURL, text }, ref) => {
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

    const shareButtonData = useMemo<
      {
        icon: keyof typeof icons;
        text: string;
        onPress: () => void;
      }[]
    >(() => {
      return [
        {
          icon: isCopied ? 'Check' : 'Link2',
          text: '링크 복사',
          onPress: withHapticPress(onPressCopyLink),
        },
        {
          icon: 'Instagram',
          text: '스토리',
          onPress: withHapticPress(() => shareInstagram(shareViewRef, { attributionURL })),
        },
        {
          icon: 'Twitter',
          text: 'X',
          onPress: withHapticPress(() => shareTwitter({ attributionURL, text })),
        },
        {
          icon: 'Ellipsis',
          text: '더보기',
          onPress: withHapticPress(() => shareMore({ url: attributionURL ?? '' })),
        },
      ];
    }, [onPressCopyLink, attributionURL, text, shareViewRef, isCopied]);

    const renderItem = useCallback<ListRenderItem<(typeof shareButtonData)[number]>>(
      (info) => {
        return (
          <View style={styles.shareButtonWrapper}>
            <IconButton
              onPress={info.item.onPress}
              icon={info.item.icon}
              size="lg"
              strokeWidth={2.5}
              color={semantics.foreground[1]}
              style={[styles.shareIconButton, { backgroundColor: semantics.background[2] }]}
              fill={'transparent'}
            />
            <Text style={[styles.shareIconButtonText, { color: semantics.foreground[1] }]}>
              {info.item.text}
            </Text>
          </View>
        );
      },
      [semantics.background[2], semantics.foreground[1]]
    );

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
          handleStyle={[styles.handle, { backgroundColor: semantics.background[3] }]}
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
            <View
              style={[
                styles.shareViewWrapper,
                { borderBottomWidth: 1, borderBottomColor: semantics.border[1] },
              ]}
            >
              {shareView}
            </View>
            <FlatList
              horizontal
              data={shareButtonData}
              keyExtractor={(item) => `${item.text}`}
              renderItem={renderItem}
              contentContainerStyle={styles.shareButtons}
            />
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    );
  }
);

const styles = StyleSheet.create({
  handle: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  shareViewWrapper: {
    alignItems: 'center',
    paddingBottom: 36,
  },
  shareButtons: {
    marginTop: 12,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  shareButtonWrapper: {
    alignItems: 'center',
    marginRight: 18,
  },
  shareIconButton: {
    width: 48,
    height: 48,
  },
  shareIconButtonText: {
    marginTop: 8,
    fontSize: 14,
  },
});
