import { useInterstitialAd } from '@/features/google-ads/google-ads.hooks';
import { useEffectOnce, useFirebaseAnalytics, withHapticPress } from '@/lib';
import { openInAppBrowser } from '@/lib/in-app-browser';
import { concertTicketBtnPressCountForInterstitialAdStorage } from '@/lib/storage/concert-ticket-btn-press-count-for-interstitial-ad-storage';
import type { components } from '@/types/api';
import { colors } from '@coldsurfers/ocean-road';
import { Button, Text, useColorScheme } from '@coldsurfers/ocean-road/native';
import { SquareArrowOutUpRight } from 'lucide-react-native';
import { memo, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';

type TicketItemProps = components['schemas']['TicketDTOSchema'];

export const TicketItem = memo(({ sellerName, url }: TicketItemProps) => {
  const { semantics } = useColorScheme();
  const { logEvent } = useFirebaseAnalytics();

  const link = useCallback(async () => {
    await openInAppBrowser(url);
  }, [url]);

  const { show, loaded } = useInterstitialAd({
    onAdOpened: () => console.log('opened'),
    onAdClosed: link,
  });

  const onPress = useCallback(() => {
    const prevCount = concertTicketBtnPressCountForInterstitialAdStorage.get() ?? 0;
    const nextCount = prevCount + 1;
    concertTicketBtnPressCountForInterstitialAdStorage.set(nextCount);
    const shouldShowAd = nextCount % 5 === 0 && loaded;
    if (shouldShowAd) {
      show();
    } else {
      link();
    }
    logEvent({
      name: 'click_find_ticket',
      params: {
        seller_name: sellerName,
        url,
      },
    });
  }, [link, loaded, logEvent, sellerName, show, url]);

  // Do not call this every time the component render
  useEffectOnce(() => {
    InAppBrowser.mayLaunchUrl(url, []);
  });

  return (
    <View style={[styles.ticketWrapper, { backgroundColor: semantics.background[4] }]}>
      <Text weight="bold" style={{ color: semantics.foreground[1], fontSize: 14 }}>
        {sellerName}
      </Text>
      <Button theme="pink" size="md" onPress={withHapticPress(onPress)} style={styles.ticketBtn}>
        <Text weight="bold" style={{ fontSize: 12, color: colors.oc.white.value }}>
          티켓 찾기
        </Text>
        <View>
          <SquareArrowOutUpRight
            size={14}
            color={colors.oc.white.value}
            strokeWidth={3}
            style={{ marginLeft: 4 }}
          />
        </View>
      </Button>
    </View>
  );
});

const styles = StyleSheet.create({
  ticketWrapper: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginHorizontal: 12,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ticketBtn: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
