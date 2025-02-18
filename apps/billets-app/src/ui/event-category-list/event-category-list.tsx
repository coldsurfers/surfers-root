import { apiClient } from '@/lib/api/openapi-client'
import { useQuery } from '@tanstack/react-query'
import { memo, useMemo } from 'react'
import { FlatList } from 'react-native'
import { EventCategoryListItem } from './event-category-list.item'

export const EventCategoryList = memo(() => {
  const { data: eventCategoriesData } = useQuery({
    queryKey: apiClient.eventCategory.queryKeys.list,
    queryFn: () => apiClient.eventCategory.getEventCategories(),
  })
  const data = useMemo(() => eventCategoriesData ?? [], [eventCategoriesData])
  return (
    <FlatList
      horizontal
      data={data}
      renderItem={({ item }) => <EventCategoryListItem {...item} />}
      keyExtractor={(item) => `${item.id}`}
      style={{ marginBottom: 12 }}
    />
  )
})
