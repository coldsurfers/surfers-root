import { memo } from 'react'
import { FlatList } from 'react-native'
import { EventCategoryListItemSkeleton } from './event-category-list.item.skeleton'

const data = [1, 2, 3]
const renderItem = () => <EventCategoryListItemSkeleton />

export const EventCategoryListSkeleton = memo(() => {
  return (
    <FlatList
      horizontal
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => `${item}`}
      style={{ marginBottom: 12 }}
    />
  )
})
