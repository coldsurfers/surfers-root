import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FundingMainScreen from '../screens/FundingMainScreen';

// export type FundingStackParam = {
//   [Screens.FundingMainScreen]: {};
// };

// export type FundingStackProp = NativeStackScreenProps<
//   MainStackNavigationParamList,
//   (typeof StackScreens)['FundingStackScreen']
// >;

// export const useFundingStackNavigation = () => {
//   return useNavigation<FundingStackProp['navigation']>();
// };

const Stack = createNativeStackNavigator();

const FundingNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}>
      <Stack.Screen name="FundingMain" component={FundingMainScreen} />
    </Stack.Navigator>
  );
};

export default FundingNavigation;
