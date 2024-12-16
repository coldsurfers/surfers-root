import { colors } from '@coldsurfers/ocean-road'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { useFocusEffect } from '@react-navigation/native'
import { memo } from 'react'
import { SearchStoreLocationConcert } from '../../store'
import { SearchBottomKeywordResultList } from '../search-bottom-keyword-result-list'
import { SearchDefaultBottomResultList } from '../search-default-bottom-result-list'
import { SearchItem } from '../search-item'
import { SearchItemThumbnail } from '../search-item-thumbnail'

export const SearchBottomList = memo(
  ({
    debouncedSearchKeyword,
    latitude,
    longitude,
    locationConcerts,
  }: {
    debouncedSearchKeyword: string
    latitude: number | null
    longitude: number | null
    locationConcerts: SearchStoreLocationConcert[]
  }) => {
    if (debouncedSearchKeyword) {
      return <SearchBottomKeywordResultList keyword={debouncedSearchKeyword} />
    }
    if (locationConcerts.length > 0) {
      return (
        <BottomSheetFlatList
          data={locationConcerts}
          renderItem={({ item }) => (
            <SearchItem
              type="concert"
              thumbnail={<SearchItemThumbnail type="square" uri={item?.posters?.at(0)?.imageUrl ?? ''} />}
              title={item.title}
              // subtitle={format(new Date(value.date), 'EEE, MMM dd')}
              // description={value.venues.at(0)?.venueTitle ?? ''}
              // onPress={() =>
              //   navigation.navigate('ConcertStackNavigation', {
              //     screen: 'ConcertDetailScreen',
              //     params: { concertId: value.id },
              //   })
              // }
            />
          )}
          bounces={false}
          focusHook={useFocusEffect}
          keyExtractor={(item) => item.id}
          style={{ flex: 1 }}
          contentContainerStyle={{
            flexGrow: 1,
            paddingVertical: 12,
            paddingBottom: 120,
            paddingHorizontal: 14,
            backgroundColor: colors.oc.gray[1].value,
          }}
        />
      )
    }
    return <SearchDefaultBottomResultList latitude={latitude} longitude={longitude} />
  },
)
