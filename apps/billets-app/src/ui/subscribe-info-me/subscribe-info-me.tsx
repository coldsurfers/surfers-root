import { apiClient } from '@/lib/api/openapi-client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { FlatList } from 'react-native'
import { SubscribeInfoMeItem } from './subscribe-info-me.item'
import { InfoMeItemTypeSchema } from './subscribe-info-me.types'

export const SubscribeInfoMe = () => {
  const { data: subscribeInfoMe } = useSuspenseQuery({
    queryKey: apiClient.subscribe.queryKeys.infoMe,
    queryFn: () => apiClient.subscribe.getInfoMe(),
  })
  const data = useMemo(
    () =>
      Object.entries(subscribeInfoMe).map(([key, value]) => {
        return {
          type: key,
          value,
        }
      }),
    [subscribeInfoMe],
  )
  console.log(data)
  return (
    <FlatList
      horizontal
      data={data}
      renderItem={({ item }) => {
        const validation = InfoMeItemTypeSchema.safeParse(item.type)
        if (!validation.success) {
          console.error(validation.error)
          return null
        }
        return (
          <SubscribeInfoMeItem type={validation.data} count={item.value.count} thumbUrl={item.value.thumbUrl ?? ''} />
        )
      }}
      keyExtractor={(item) => `${item.type}`}
      style={{
        flex: 1,
      }}
      contentContainerStyle={{
        paddingHorizontal: 16,
      }}
    />
  )
}
