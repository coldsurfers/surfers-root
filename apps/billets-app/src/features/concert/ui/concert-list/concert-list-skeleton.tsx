import { memo } from 'react'
import { FlatList } from 'react-native'
import { ConcertListItem } from '../concert-list-item'
import { concertListStyles } from './concert-list.styles'

const renderItem = () => {
  return <ConcertListItem.Skeleton />
}

const data = Array.from({ length: 5 }).map((_, index) => index)

export const ConcertListSkeleton = memo(() => {
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      contentContainerStyle={concertListStyles.concertListContentContainer}
    />
  )
})
