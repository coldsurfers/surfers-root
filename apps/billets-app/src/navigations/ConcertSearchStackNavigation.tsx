// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import React from 'react';
// import {Screens, StackScreens} from '../lib/navigations';
// import ConcertDetailScreen, {
//   ConcertDetailScreenParam,
// } from '../screens/ConcertDetailScreen';
// import ConcertSearchMainScreen, {
//   ConcertSearchMainScreenParam,
// } from '../screens/ConcertSearchMainScreen';

// export type ConcertSearchStackParam = {
//   [StackScreens.ConcertSearchStackScreen]: {};
// };

// export type ConcertSearchStackParamList = ConcertSearchMainScreenParam &
//   ConcertDetailScreenParam;

// const Stack = createNativeStackNavigator<ConcertSearchStackParamList>();

// const GigNewsSearchStackNavigation = () => {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         header: () => null,
//       }}>
//       <Stack.Screen
//         name={Screens.ConcertSearchMainScreen}
//         component={ConcertSearchMainScreen}
//       />
//       <Stack.Screen
//         name={Screens.ConcertDetailScreen}
//         component={ConcertDetailScreen}
//       />
//     </Stack.Navigator>
//   );
// };

// export default GigNewsSearchStackNavigation;
