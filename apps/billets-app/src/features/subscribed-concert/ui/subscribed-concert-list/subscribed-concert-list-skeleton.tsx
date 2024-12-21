import { ConcertListItem } from '@/features/concert'
import { memo } from 'react'
import { FlatList, View } from 'react-native'
import { subscribedConcertListStyles } from './subscribed-concert-list.styles'

const renderItem = () => {
  return <ConcertListItem.Skeleton size="small" />
}

const data = Array.from({ length: 5 })

const ItemSeparator = () => <View style={subscribedConcertListStyles.itemSeparator} />

export const SubscribedConcertListSkeleton = memo(() => {
  return (
    <FlatList
      horizontal
      data={data}
      renderItem={renderItem}
      contentContainerStyle={subscribedConcertListStyles.contentContainer}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
})
