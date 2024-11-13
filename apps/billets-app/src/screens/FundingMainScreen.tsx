import { palette } from 'fstvllife-design-system'
import React, { FC } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'

// export type FundingMainScreenParam = {};

// export type FundingMainScreenProp = {
//   route: RouteProp<
//     FundingStackParamList,
//     (typeof Screens)['FundingMainScreen']
//   >;
//   navigation: CompositeNavigationProp<
//     NativeStackNavigationProp<
//       FundingStackParamList,
//       (typeof Screens)['FundingMainScreen']
//     >,
//     NativeStackNavigationProp<
//       MainStackNavigationParamList,
//       (typeof StackScreens)['FundingStackScreen']
//     >
//   >;
// };

// export const useFundingMainScreenNavigation = () => {
//   return useNavigation<FundingMainScreenProp['navigation']>();
// };

// export const useFundingMainScreenRoute = () => {
//   return useRoute<FundingMainScreenProp['route']>();
// };

const FundingMainScreen: FC = () => {
  return <SafeAreaView style={styles.wrapper} />
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: palette.white,
  },
})

export default FundingMainScreen
