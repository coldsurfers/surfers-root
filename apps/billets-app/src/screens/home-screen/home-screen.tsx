import {
  CurrentLocationTracker,
  LocationSelector,
  LocationSelectorModal,
  useToggleSubscribeConcert,
  useUserCurrentLocationStore,
} from '@/features'
import { ConcertListItemT } from '@/features/concert/ui/concert-list/concert-list.types'
import { AnimatePresence } from '@/ui'
import { useScrollToTop } from '@react-navigation/native'
import { useCallback, useRef, useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useShallow } from 'zustand/shallow'
import { ConcertList } from '../../features/concert'
import palettes from '../../lib/palettes'
import useGetMeQuery from '../../lib/react-query/queries/useGetMeQuery'
import { useHomeScreenNavigation } from './home-screen.hooks'

export const HomeScreen = () => {
  const navigation = useHomeScreenNavigation()
  const listRef = useRef<FlatList>(null)
  const [locationModalVisible, setLocationModalVisible] = useState(false)
  const { latitude, longitude } = useUserCurrentLocationStore(
    useShallow((state) => ({
      latitude: state.latitude ? +`${state.latitude}`.substring(0, 7) : null,
      longitude: state.longitude ? +`${state.longitude}`.substring(0, 8) : null,
    })),
  )

  const { data: meData } = useGetMeQuery()

  const toggleSubscribeConcert = useToggleSubscribeConcert()

  const onPressConcertListItem = useCallback(
    (concertId: string) => {
      navigation.navigate('ConcertStackNavigation', {
        screen: 'ConcertDetailScreen',
        params: { concertId },
      })
    },
    [navigation],
  )

  const onPressSubscribeConcertListItem = useCallback(
    ({ isSubscribed, concertId }: { isSubscribed: boolean; concertId: string }) => {
      if (!meData) {
        navigation.navigate('LoginStackNavigation', {
          screen: 'LoginSelectionScreen',
          params: {},
        })
        return
      }

      toggleSubscribeConcert({
        isSubscribed,
        concertId,
      })
    },
    [meData, navigation, toggleSubscribeConcert],
  )

  useScrollToTop(listRef)

  const onPressSubscribe = useCallback(
    (
      item: ConcertListItemT,
      options: {
        isSubscribed: boolean
      },
    ) =>
      onPressSubscribeConcertListItem({
        isSubscribed: options.isSubscribed,
        concertId: item.id,
      }),
    [onPressSubscribeConcertListItem],
  )

  return (
    <SafeAreaView edges={['top']} style={styles.wrapper}>
      {latitude === null && longitude === null && <CurrentLocationTracker />}
      <LocationSelector onPress={() => setLocationModalVisible(true)} />
      <ConcertList
        ref={listRef}
        onPressItem={(item) => onPressConcertListItem(item.id)}
        onPressSubscribe={onPressSubscribe}
      />
      <AnimatePresence>
        {locationModalVisible && (
          <LocationSelectorModal
            visible={locationModalVisible}
            onPressBackground={() => setLocationModalVisible(false)}
          />
        )}
      </AnimatePresence>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: palettes.gray['100'] },
  concertListItem: {
    width: '100%',
    backgroundColor: palettes.white,
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
  },
  concertThumbnail: {
    width: '100%',
    height: 250,
    borderRadius: 8,
    marginBottom: 12,
  },
  concertTitle: { fontWeight: 'bold', fontSize: 18 },
  concertFormattedDate: { marginTop: 8 },
  concertVenue: { marginTop: 8 },
  concertListContentContainer: {
    paddingHorizontal: 12,
    marginTop: 12,
    paddingBottom: 24,
    flexGrow: 1,
  },
  loadingIndicatorWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyWrapper: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyEmoji: { fontSize: 28 },
  emptyDesc: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 12,
  },
  concertInfoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  concertSaveButton: {
    marginLeft: 'auto',
    borderWidth: 1,
    borderRadius: 18,
    borderColor: palettes.gray['300'],
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
