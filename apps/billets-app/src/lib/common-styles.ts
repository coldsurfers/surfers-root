import { StyleSheet } from 'react-native'
import palettes from './palettes'

const commonShadowStyles = StyleSheet.create({
  commonShadow: {
    // iOS Shadow Properties
    shadowColor: palettes.black, // Shadow color
    shadowOpacity: 0.25, // Opacity of the shadow
    shadowRadius: 3.84, // How blurry the shadow is
    // Android Shadow Property
    elevation: 5, // Elevation for Android
  },
})

const commonStyles = StyleSheet.create({
  shadowBox: {
    ...commonShadowStyles.commonShadow,
    shadowOffset: { width: 0, height: 2 }, // Shadow position
  },
  topShadowBox: {
    ...commonShadowStyles.commonShadow,
    shadowOffset: { width: 0, height: -8 }, // Shadow position
  },
})

export default commonStyles
