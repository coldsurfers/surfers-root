// import {palette, Spinner} from '@coldsurfers/ocean-road/native';
// import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
// import {
//   CompositeNavigationProp,
//   RouteProp,
//   useNavigation,
//   useRoute,
// } from '@react-navigation/native';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import React, {useCallback, useMemo} from 'react';
// import {StyleSheet, View} from 'react-native';
// import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import {
//   ConcertCollectionList,
//   ConcertCollectionListSections,
// } from '../components/List/ConcertCollectionList';
// import {Screens, StackScreens, TabScreens} from '../lib/navigations';
// import useRecentConcertListQuery from '../lib/hooks/queries/useRecentConcertListQuery';
// import {ConcertCategory} from '../types/Concert';

// export type ConcertMainScreenParam = {
//   [Screens.ConcertMainScreen]: {};
// };
// export type ConcertMainScreenProp = {
//   route: RouteProp<
//     ConcertStackParamList,
//     (typeof Screens)['ConcertMainScreen']
//   >;
//   navigation: CompositeNavigationProp<
//     NativeStackNavigationProp<
//       ConcertStackParamList,
//       (typeof Screens)['ConcertMainScreen']
//     >,
//     CompositeNavigationProp<
//       BottomTabNavigationProp<
//         MainTabNavigationParamList,
//         (typeof StackScreens)['ConcertStackScreen']
//       >,
//       NativeStackNavigationProp<
//         MainStackNavigationParamList,
//         (typeof TabScreens)['MainTabScreen']
//       >
//     >
//   >;
// };

// export const useConcertMainScreenNavigation = () => {
//   return useNavigation<ConcertMainScreenProp['navigation']>();
// };
// export const useConcertMainScreenRoute = () => {
//   return useRoute<ConcertMainScreenProp['route']>();
// };

// const ConcertMainScreen = () => {
//   const {navigate} = useConcertMainScreenNavigation();
//   const {top} = useSafeAreaInsets();
//   const {data: recentConcertList, isLoading: isLoadingRecentConcertList} =
//     useRecentConcertListQuery();

//   const sections: ConcertCollectionListSections = useMemo(() => {
//     if (!recentConcertList) {
//       return [];
//     }
//     const innerSections: ConcertCollectionListSections = recentConcertList.map(
//       item => {
//         return {
//           title: item.title,
//           categoryId: item.id,
//           data: [
//             {
//               items: item.concerts,
//             },
//           ],
//         };
//       },
//     );
//     return innerSections;
//   }, [recentConcertList]);

//   const onPressHeaderItem = useCallback(
//     (category: ConcertCategory) => {
//       navigate('ConcertListByCategoryScreen', {
//         category,
//       });
//     },
//     [navigate],
//   );

//   const onPressItem = useCallback(
//     (id: number) => {
//       navigate('ConcertDetailScreen', {
//         concertId: id,
//       });
//     },
//     [navigate],
//   );

//   return (
//     <View style={[styles.wrapper, {paddingTop: top}]}>
//       {isLoadingRecentConcertList ? (
//         <Spinner />
//       ) : (
//         <ConcertCollectionList
//           sections={sections}
//           onPressHeaderItem={onPressHeaderItem}
//           onPressItem={onPressItem}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   wrapper: {flex: 1, backgroundColor: palette.white},
// });

// export default ConcertMainScreen;
