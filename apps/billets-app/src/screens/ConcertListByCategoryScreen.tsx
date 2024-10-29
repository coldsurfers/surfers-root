// import {palette, Text} from 'fstvllife-design-system';
// import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
// import {
//   CompositeNavigationProp,
//   RouteProp,
//   useNavigation,
//   useRoute,
// } from '@react-navigation/native';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import React, {useCallback, useEffect, useMemo} from 'react';
// import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
// import {Screens, StackScreens, TabScreens} from '../lib/navigations';
// import {Header} from '../components/Header';
// import {ConcertCategory} from '../types/Concert';
// import useConcertListQuery from '../lib/hooks/queries/useConcertListQuery';

// export type ConcertListByCategoryScreenParam = {
//   [Screens.ConcertListByCategoryScreen]: {
//     category: ConcertCategory;
//   };
// };
// export type ConcertListByCategoryScreenProp = {
//   route: RouteProp<
//     ConcertStackParamList,
//     (typeof Screens)['ConcertListByCategoryScreen']
//   >;
//   navigation: CompositeNavigationProp<
//     NativeStackNavigationProp<
//       ConcertStackParamList,
//       'ConcertListByCategoryScreen'
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

// export const useConcertListByCategoryScreenNavigation = () => {
//   return useNavigation<ConcertListByCategoryScreenProp['navigation']>();
// };
// export const useConcertListByCategoryScreenRoute = () => {
//   return useRoute<ConcertListByCategoryScreenProp['route']>();
// };

// const ConcertListByCategoryScreen = () => {
//   const {setOptions} = useConcertListByCategoryScreenNavigation();
//   const {params} = useConcertListByCategoryScreenRoute();
//   const {category} = params;
//   const {
//     data: concertListData,
//     isLoading: isLoadingConcertList,
//     fetchNextPage: fetchNextConcertList,
//     hasNextPage: hasNextConcertList,
//     isFetchingNextPage: isFetchingNextConcertList,
//     refetch: refetchConcertList,
//   } = useConcertListQuery({
//     categoryId: category.id,
//   });

//   useEffect(() => {
//     setOptions({
//       header: () => <Header title={category.title} />,
//     });
//   }, [category.title, setOptions]);

//   const data = useMemo(
//     () => concertListData?.pages.flat() ?? [],
//     [concertListData?.pages],
//   );

//   const onEndReached = useCallback(() => {
//     if (
//       isLoadingConcertList ||
//       isFetchingNextConcertList ||
//       !hasNextConcertList
//     ) {
//       return;
//     }
//     fetchNextConcertList();
//   }, [
//     fetchNextConcertList,
//     hasNextConcertList,
//     isFetchingNextConcertList,
//     isLoadingConcertList,
//   ]);

//   return (
//     <SafeAreaView style={styles.wrapper}>
//       <View style={styles.inner} />
//       <FlatList
//         data={data}
//         renderItem={({item}) => {
//           return (
//             <View>
//               <Text>{item.title}</Text>
//             </View>
//           );
//         }}
//         keyExtractor={({id}) => `${id}`}
//         refreshing={isLoadingConcertList}
//         onRefresh={() => refetchConcertList()}
//         onEndReached={onEndReached}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   wrapper: {
//     flex: 1,
//     backgroundColor: palette.white,
//   },
//   inner: {
//     paddingLeft: 8,
//     paddingRight: 8,
//   },
//   topWrapper: {flexDirection: 'row', alignItems: 'center'},
//   title: {
//     fontWeight: '700',
//     fontSize: 26,
//     color: palette.pink,
//     marginLeft: 12,
//   },
//   backButton: {
//     marginTop: 4,
//     marginBottom: 4,
//   },
// });

// export default ConcertListByCategoryScreen;
