import { palette } from 'fstvllife-design-system'
import React, { memo, useCallback, useMemo, useRef } from 'react'
import { Dimensions, Linking, StyleSheet, View } from 'react-native'
import WebView, { WebViewMessageEvent } from 'react-native-webview'
import { CONCERT_DETAIL_LIST_HEADER_HEIGHT, TAB_BAR_HEIGHT } from '../../../../lib/constants'

interface Props {
  html: string
}

const ConcertWebview = ({ html }: Props) => {
  const webview = useRef<WebView>(null)
  const source = useMemo(() => ({ uri: 'https://fstvllife-concert-webview.vercel.app' }), [])
  const onLoad = useCallback(() => {
    const json = {
      type: 'send-html',
      data: {
        html,
      },
    }
    webview.current?.postMessage(JSON.stringify(json))
  }, [html])
  const onMessage = useCallback((event: WebViewMessageEvent) => {
    const { data } = event.nativeEvent
    try {
      const parsed = JSON.parse(data) as {
        type: 'click-anchor'
        data: {
          link: string
        }
      }
      switch (parsed.type) {
        case 'click-anchor':
          Linking.openURL(parsed.data.link)
          break
        default:
          break
      }
    } catch (e) {
      console.error(e)
    }
  }, [])

  return (
    <View style={styles.wrapper}>
      <WebView
        ref={webview}
        style={styles.webview}
        scalesPageToFit
        source={source}
        javaScriptEnabled
        onLoad={onLoad}
        onMessage={onMessage}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
    height: Dimensions.get('window').height - CONCERT_DETAIL_LIST_HEADER_HEIGHT - TAB_BAR_HEIGHT,
    backgroundColor: palette.white,
    alignItems: 'center',
    paddingTop: 8,
  },
  webview: {
    flex: 1,
    width: Dimensions.get('window').width - 12 * 2,
    marginBottom: TAB_BAR_HEIGHT + 50,
  },
})

export default memo(ConcertWebview)
