import { useInterstitialAd } from '@/features/google-ads/google-ads.hooks'
import { concertTicketBtnPressCountForInterstitialAdStorage } from '@/lib/storage/concert-ticket-btn-press-count-for-interstitial-ad-storage'
import { components } from '@/types/api'
import { Button, Text, useColorScheme } from '@coldsurfers/ocean-road/native'
import { memo, useCallback } from 'react'
import { Linking, StyleSheet, View } from 'react-native'

type TicketItemProps = components['schemas']['TicketDTOSchema']

export const TicketItem = memo(({ sellerName, url }: TicketItemProps) => {
  const { semantics } = useColorScheme()

  const link = useCallback(() => Linking.openURL(url), [url])

  const { show, loaded } = useInterstitialAd({
    onAdOpened: () => console.log('opened'),
    onAdClosed: link,
  })

  const onPress = useCallback(() => {
    const prevCount = concertTicketBtnPressCountForInterstitialAdStorage.get() ?? 0
    const nextCount = prevCount + 1
    concertTicketBtnPressCountForInterstitialAdStorage.set(nextCount)
    const shouldShowAd = nextCount % 5 === 0 && loaded
    if (shouldShowAd) {
      show()
    } else {
      link()
    }
  }, [link, loaded, show])

  return (
    <View style={[styles.ticketWrapper, { backgroundColor: semantics.background[4] }]}>
      <Text weight="bold" style={{ color: semantics.foreground[1] }}>
        {sellerName}
      </Text>
      <Button theme="pink" size="md" onPress={onPress} style={styles.ticketBtn}>
        티켓 찾기
      </Button>
    </View>
  )
})

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
  },
})
