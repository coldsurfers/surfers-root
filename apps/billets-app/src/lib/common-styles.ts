import { StyleSheet } from 'react-native'
import palettes from './palettes'

const commonStyles = StyleSheet.create({
  shadowBox: {
    // iOS Shadow Properties
    shadowColor: palettes.black, // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow position
    shadowOpacity: 0.25, // Opacity of the shadow
    shadowRadius: 3.84, // How blurry the shadow is

    // Android Shadow Property
    elevation: 5, // Elevation for Android
  },
  topShadowBox: {
    // iOS Shadow Properties
    shadowColor: palettes.black, // Shadow color
    shadowOffset: { width: 0, height: -8 }, // Shadow position
    shadowOpacity: 0.25, // Opacity of the shadow
    shadowRadius: 3.84, // How blurry the shadow is

    // Android Shadow Property
    elevation: 5, // Elevation for Android
  },
})

export default commonStyles
