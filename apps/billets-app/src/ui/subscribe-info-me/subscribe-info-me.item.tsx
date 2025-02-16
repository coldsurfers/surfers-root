import { Text, useColorScheme } from '@coldsurfers/ocean-road/native'
import { useMemo } from 'react'
import { match } from 'ts-pattern'
import { z } from 'zod'
import {
  StyledSubscribeInfoMeContainer,
  StyledSubscribeInfoMeItem,
  StyledSubscribeInfoMeItemImage,
} from './subscribe-info-me.styled'
import { InfoMeItemTypeSchema } from './subscribe-info-me.types'

const refineCount = (count: number) => {
  if (count > 99) {
    return `99+`
  }
  return count
}

export const SubscribeInfoMeItem = ({
  type,
  count,
  thumbUrl,
}: {
  type: z.infer<typeof InfoMeItemTypeSchema>
  count: number
  thumbUrl?: string
}) => {
  const { semantics } = useColorScheme()
  const refinedCount = useMemo(() => refineCount(count), [count])
  //   navigation.navigate('SubscribedStackNavigation', {
  //       screen: 'SubscribedConcertListScreen',
  //       params: {},
  //     })
  return (
    <StyledSubscribeInfoMeContainer>
      <StyledSubscribeInfoMeItem
        style={{
          borderColor: semantics.border[1],
        }}
      >
        <StyledSubscribeInfoMeItemImage source={{ uri: thumbUrl }} />
      </StyledSubscribeInfoMeItem>
      <Text weight="medium" style={{ color: semantics.foreground[1], fontSize: 14, marginTop: 8 }}>
        {match(type)
          .with('artists', () => `${refinedCount} 아티스트`)
          .with('events', () => `${refinedCount} 공연`)
          .with('venues', () => `${refinedCount} 공연장`)
          .exhaustive()}
      </Text>
    </StyledSubscribeInfoMeContainer>
  )
}
