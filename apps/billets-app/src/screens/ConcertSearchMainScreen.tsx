// import {Spinner, TextInput} from '@coldsurfers/ocean-road/native';
// import React, {
//   useCallback,
//   useContext,
//   useEffect,
//   useMemo,
//   useState,
// } from 'react';
// import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
// import FullGigNewsItem from '../components/ListItem/FullGigNewsItem';
// import {
//   ToastVisibleContext,
//   ToastVisibleContextProvider,
// } from '../lib/contexts/ToastVisibleContext';
// import useSearchConcertQuery from '../lib/hooks/queries/useSearchConcertQuery';
// import {Screens, StackScreens, TabScreens} from '../lib/navigations';
// import {format} from 'date-fns';
// import {
//   CompositeNavigationProp,
//   RouteProp,
//   useNavigation,
// } from '@react-navigation/native';
// import {ConcertSearchStackParamList} from '../navigations/ConcertSearchStackNavigation';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
// import {MainTabNavigationParamList} from '../navigations/MainTabNavigation';
// import {MainStackNavigationParamList} from '../navigations/MainStackNavigation';

// export type ConcertSearchMainScreenProp = {
//   route: RouteProp<
//     ConcertSearchStackParamList,
//     (typeof Screens)['ConcertSearchMainScreen']
//   >;
//   navigation: CompositeNavigationProp<
//     NativeStackNavigationProp<
//       ConcertSearchStackParamList,
//       (typeof Screens)['ConcertSearchMainScreen']
//     >,
//     CompositeNavigationProp<
//       BottomTabNavigationProp<
//         MainTabNavigationParamList,
//         (typeof StackScreens)['ConcertSearchStackScreen']
//       >,
//       NativeStackNavigationProp<
//         MainStackNavigationParamList,
//         (typeof TabScreens)['MainTabScreen']
//       >
//     >
//   >;
// };

// export type ConcertSearchMainScreenParam = {
//   [Screens.ConcertSearchMainScreen]: {};
// };

// export const useGigNewsSearchMainScreenNavigation = () => {
//   return useNavigation<ConcertSearchMainScreenProp['navigation']>();
// };

// const ConcertSearchMainScreen = () => {
//   const {navigate} = useGigNewsSearchMainScreenNavigation();
//   const {show} = useContext(ToastVisibleContext);
//   const [keyword, setKeyword] = useState<string>('');
//   const onKeywordTextInputChangeText = useCallback(
//     (text: string) => setKeyword(text),
//     [],
//   );
//   const {
//     data,
//     isFetching,
//     error,
//     fetchNextPage,
//     isFetchingNextPage,
//     hasNextPage,
//   } = useSearchConcertQuery({keyword, size: 20, offset: 0});

//   const searchedGigNewsList = useMemo(() => {
//     const list = data?.pages;
//     if (list) {
//       return list.flatMap(item => item.data);
//     } else {
//       return [];
//     }
//   }, [data?.pages]);

//   const isLoading = useMemo(
//     () => isFetching || isFetchingNextPage,
//     [isFetching, isFetchingNextPage],
//   );
//   const canFetchNextPage = useMemo(
//     () => !isLoading && hasNextPage,
//     [hasNextPage, isLoading],
//   );
//   const onEndReached: (info: {distanceFromEnd: number}) => void =
//     useCallback(() => {
//       if (!canFetchNextPage) {
//         return;
//       }
//       fetchNextPage({
//         pageParam: searchedGigNewsList.length,
//       });
//     }, [canFetchNextPage, fetchNextPage, searchedGigNewsList.length]);

//   useEffect(() => {
//     if (error) {
//       const {response} = error;
//       if (!response) {
//         return;
//       }
//       show({
//         type: 'error',
//         message: response.data?.error?.message,
//         autoHide: true,
//         duration: 5000,
//       });
//     }
//   }, [error, show]);

//   return (
//     <SafeAreaView style={styles.wrapper}>
//       <View style={styles.innerWrapper}>
//         <TextInput
//           value={keyword}
//           onChangeText={onKeywordTextInputChangeText}
//           placeholder="공연 검색하기"
//           clearButtonMode="always"
//         />
//         {searchedGigNewsList.length > 0 ? (
//           <FlatList
//             contentContainerStyle={{
//               marginTop: 12,
//             }}
//             data={searchedGigNewsList}
//             renderItem={({item}) => {
//               return (
//                 <FullGigNewsItem
//                   key={item.id}
//                   onPress={() =>
//                     navigate('ConcertDetailScreen', {
//                       concertId: item.id,
//                     })
//                   }
//                   thumbnailURI={item.posters?.[0]?.imageURL ?? ''}
//                   titleText={item.title}
//                   dateText={format(new Date(item.date), 'yyyy-MM-dd')}
//                 />
//               );
//             }}
//             ItemSeparatorComponent={() => <View style={{height: 12}} />}
//             keyExtractor={item => `${item.id}`}
//             onEndReached={onEndReached}
//           />
//         ) : null}
//         {isLoading ? <Spinner /> : null}
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   wrapper: {
//     flex: 1,
//   },
//   innerWrapper: {flex: 1, paddingHorizontal: 8},
// });

// const ConcertSearchMainScreenWithToast = () => {
//   return (
//     <ToastVisibleContextProvider>
//       <ConcertSearchMainScreen />
//     </ToastVisibleContextProvider>
//   );
// };

// export default ConcertSearchMainScreenWithToast;
