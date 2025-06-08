import { colors } from '@coldsurfers/ocean-road'
import { InAppBrowser } from 'react-native-inappbrowser-reborn'

export const openInAppBrowser = async (url: string) => {
  if (!(await InAppBrowser.isAvailable())) {
    return
  }
  return InAppBrowser.open(url, {
    // iOS Properties
    dismissButtonStyle: 'cancel',
    preferredBarTintColor: colors.oc.gray[7].value,
    preferredControlTintColor: 'white',
    readerMode: false,
    animated: true,
    modalPresentationStyle: 'formSheet',
    modalTransitionStyle: 'coverVertical',
    modalEnabled: true,
    enableBarCollapsing: false,
    // Android Properties
    showTitle: true,
    toolbarColor: '#6200EE',
    secondaryToolbarColor: 'black',
    navigationBarColor: 'black',
    navigationBarDividerColor: 'white',
    enableUrlBarHiding: true,
    enableDefaultShare: true,
    forceCloseOnRedirection: false,
    // Specify full animation resource identifier(package:anim/name)
    // or only resource name(in case of animation bundled with app).
    // animations: {
    //   startEnter: 'slide_in_right',
    //   startExit: 'slide_out_left',
    //   endEnter: 'slide_in_left',
    //   endExit: 'slide_out_right',
    // },
    // headers: {
    //   'my-custom-header': 'my custom header value',
    // },
  })
}
