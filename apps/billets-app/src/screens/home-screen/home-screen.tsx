import { CurrentLocationTracker, LocationSelector, LocationSelectorModal } from '@/features'
import { AnimatePresence } from '@/ui'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useShallow } from 'zustand/shallow'
import { ConcertList } from '../../features/concert'
import palettes from '../../lib/palettes'
import { v1QueryKeyFactory } from '../../lib/query-key-factory'
import useSubscribeConcertMutation from '../../lib/react-query/mutations/useSubscribeConcertMutation'
import useUnsubscribeConcertMutation from '../../lib/react-query/mutations/useUnsubscribeConcertMutation'
import useGetMeQuery from '../../lib/react-query/queries/useGetMeQuery'
import useSubscribedConcertListQuery from '../../lib/react-query/queries/useSubscribedConcertListQuery'
import useSubscribedConcertQuery from '../../lib/react-query/queries/useSubscribedConcertQuery'
import { useUserCurrentLocationStore } from '../../lib/stores/userCurrentLocationStore'
import { useHomeScreenNavigation } from './home-screen.hooks'

export const HomeScreen = () => {
  const navigation = useHomeScreenNavigation()
  const [locationModalVisible, setLocationModalVisible] = useState(false)
  const { latitude, longitude } = useUserCurrentLocationStore(
    useShallow((state) => ({
      latitude: state.latitude ? +`${state.latitude}`.substring(0, 7) : null,
      longitude: state.longitude ? +`${state.longitude}`.substring(0, 8) : null,
    })),
  )

  const queryClient = useQueryClient()

  const { data: meData } = useGetMeQuery()

  const { mutate: subscribeConcert } = useSubscribeConcertMutation({
    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: v1QueryKeyFactory.concerts.subscribed({
          concertId: variables.id,
        }).queryKey,
      })
      if (!meData) {
        return
      }
      const previousSubscribedConcertList = queryClient.getQueryData<
        Awaited<ReturnType<typeof useSubscribedConcertListQuery>>['data']
      >(v1QueryKeyFactory.concerts.subscribedList.queryKey)
      const newSubscribedConcert: Awaited<ReturnType<typeof useSubscribedConcertQuery>['data']> = {
        concertId: variables.id,
        userId: meData.id,
      }

      queryClient.setQueryData(
        v1QueryKeyFactory.concerts.subscribed({ concertId: variables.id }).queryKey,
        newSubscribedConcert,
      )
      queryClient.setQueryData(v1QueryKeyFactory.concerts.subscribedList.queryKey, {
        ...previousSubscribedConcertList,
        pageParams: previousSubscribedConcertList?.pageParams ?? 0,
        pages: [newSubscribedConcert, ...(previousSubscribedConcertList?.pages.flat() ?? [])],
      })
      return newSubscribedConcert
    },
    onSettled: (data) => {
      if (!data?.concertId) {
        return
      }
      queryClient.invalidateQueries({
        queryKey: v1QueryKeyFactory.concerts.subscribed({
          concertId: data.concertId,
        }).queryKey,
      })
      queryClient.invalidateQueries({
        queryKey: v1QueryKeyFactory.concerts.subscribedList.queryKey,
      })
    },
  })
  const { mutate: unsubscribeConcert } = useUnsubscribeConcertMutation({
    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: v1QueryKeyFactory.concerts.subscribed({
          concertId: variables.id,
        }).queryKey,
      })
      const previousSubscribedConcertList = queryClient.getQueryData<
        Awaited<ReturnType<typeof useSubscribedConcertListQuery>>['data']
      >(v1QueryKeyFactory.concerts.subscribedList.queryKey)
      queryClient.setQueryData(
        v1QueryKeyFactory.concerts.subscribed({
          concertId: variables.id,
        }).queryKey,
        null,
      )
      queryClient.setQueryData(v1QueryKeyFactory.concerts.subscribedList.queryKey, {
        ...previousSubscribedConcertList,
        pageParams: previousSubscribedConcertList?.pageParams ?? 0,
        pages: (previousSubscribedConcertList?.pages.flat() ?? []).filter((v) => v?.concertId !== variables.id),
      })
      return null
    },
    onSettled: (data) => {
      if (!data?.concertId) {
        return
      }
      queryClient.invalidateQueries({
        queryKey: v1QueryKeyFactory.concerts.subscribed({
          concertId: data.concertId,
        }).queryKey,
      })
      queryClient.invalidateQueries({
        queryKey: v1QueryKeyFactory.concerts.subscribedList.queryKey,
      })
    },
  })

  const onPressConcertListItem = useCallback(
    (concertId: string) => {
      navigation.navigate('ConcertStackScreen', {
        screen: 'ConcertDetailScreen',
        params: { concertId },
      })
    },
    [navigation],
  )

  const onPressSubscribeConcertListItem = useCallback(
    ({ isSubscribed, concertId }: { isSubscribed: boolean; concertId: string }) => {
      if (!meData) {
        navigation.navigate('LoginStackScreen', {
          screen: 'LoginSelectionScreen',
          params: {},
        })
        return
      }

      if (isSubscribed) {
        unsubscribeConcert({ id: concertId })
      } else {
        subscribeConcert({ id: concertId })
      }
    },
    [meData, navigation, subscribeConcert, unsubscribeConcert],
  )

  return (
    <SafeAreaView edges={['top']} style={styles.wrapper}>
      {latitude === null && longitude === null && <CurrentLocationTracker />}
      <LocationSelector onPress={() => setLocationModalVisible(true)} />
      <ConcertList
        onPressItem={(item) => onPressConcertListItem(item.id)}
        onPressSubscribe={(item, { isSubscribed }) =>
          onPressSubscribeConcertListItem({
            isSubscribed,
            concertId: item.id,
          })
        }
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
