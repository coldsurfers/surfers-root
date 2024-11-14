// import {palette, Spinner, Text} from '@coldsurfers/ocean-road/native';
// import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
// import {
//   CompositeNavigationProp,
//   RouteProp,
//   useNavigation,
// } from '@react-navigation/native';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import React, {useMemo, useState} from 'react';
// import {SafeAreaView, StyleSheet, View} from 'react-native';
// import {Agenda, AgendaEntry} from 'react-native-calendars';
// import {Screens, StackScreens} from '../lib/navigations';
// import {format} from 'date-fns';
// import FullGigNewsItem from '../components/ListItem/FullGigNewsItem';
// import useConcertListQuery from '../lib/hooks/queries/useConcertListQuery';

// export type CalendarMainScreenParam = {
//   [Screens.CalendarMainScreen]: {};
// };

// export type CalendarMainScreenProp = {
//   route: RouteProp<
//     CalendarStackParamList,
//     (typeof Screens)['CalendarMainScreen']
//   >;
//   navigation: CompositeNavigationProp<
//     NativeStackNavigationProp<
//       CalendarStackParamList,
//       (typeof Screens)['CalendarMainScreen']
//     >,
//     BottomTabNavigationProp<
//       MainTabNavigationParamList,
//       (typeof StackScreens)['CalendarStackScreen']
//     >
//   >;
// };

// export const useCalendarMainScreenNavigation = () => {
//   return useNavigation<CalendarMainScreenProp['navigation']>();
// };

// const CalendarMainScreen = () => {
//   const [renderReady, setRenderReady] = useState<boolean>(false);
//   const {navigate} = useCalendarMainScreenNavigation();
//   const {data: concertListData, isLoading: isLoadingConcertList} =
//     useConcertListQuery({offset: 0, size: 10});
//   const concertListByDate: Record<string, Array<AgendaEntry>> = useMemo(() => {
//     if (!concertListData) {
//       return {};
//     }
//     const innerListByDate: Record<string, Array<AgendaEntry>> = {};
//     const {data: list} = concertListData;

//     list.forEach(concert => {
//       const {date} = concert;
//       const formatted = format(new Date(date), 'yyyy-MM-dd');
//       if (Array.isArray(innerListByDate[formatted])) {
//         innerListByDate[formatted] = innerListByDate[formatted].concat({
//           name: concert.title,
//           height: 80,
//           day: formatted,
//           gigNewsId: concert.id,
//           thumbnailURL: concert.posters?.[0]?.imageURL ?? '',
//         });
//       } else {
//         innerListByDate[formatted] = [
//           {
//             name: concert.title,
//             height: 80,
//             day: formatted,
//             gigNewsId: concert.id,
//             thumbnailURL: concert.posters?.[0]?.imageURL ?? '',
//           },
//         ];
//       }
//     });

//     return innerListByDate;
//   }, [concertListData]);

//   return (
//     <SafeAreaView onLayout={() => setRenderReady(true)} style={styles.wrapper}>
//       {renderReady && !isLoadingConcertList ? (
//         <Agenda
//           theme={{
//             selectedDayBackgroundColor: palette.pink,
//             dotColor: palette.pink,
//             selectedDotColor: palette.white,
//             dayTextColor: palette.black,
//             textInactiveColor: palette.black,
//             todayTextColor: palette.black,
//             agendaDayTextColor: palette.pink,
//             // agendaKnobColor: palette.pink,
//             agendaDayNumColor: palette.pink,
//             agendaTodayColor: palette.pink,
//             // textSectionTitleColor: palette.pink,
//           }}
//           date={new Date().toString()}
//           selected={new Date().toString()}
//           items={concertListByDate}
//           renderItem={reservation => {
//             return (
//               <FullGigNewsItem
//                 key={reservation.gigNewsId}
//                 wrapperStyles={{
//                   height: reservation.height,
//                   marginTop: 12,
//                 }}
//                 onPress={() =>
//                   navigate('ConcertDetailScreen', {
//                     concertId: reservation.gigNewsId,
//                   })
//                 }
//                 thumbnailURI={reservation.thumbnailURL}
//                 titleText={reservation.name}
//                 dateText={reservation.day}
//               />
//             );
//           }}
//           renderEmptyData={() => {
//             return (
//               <View style={styles.emptyAgenda}>
//                 <Text>공연이 없는 날이에요</Text>
//               </View>
//             );
//           }}
//         />
//       ) : (
//         <Spinner />
//       )}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   wrapper: {
//     flex: 1,
//     backgroundColor: palette.white,
//   },
//   emptyAgenda: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default CalendarMainScreen;
