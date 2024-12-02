import { HorizontalConcertItem } from '@/features/concert/ui'
import { Text } from '@coldsurfers/ocean-road/native'
import { ReactNode } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { match } from 'ts-pattern'
import palettes from '../../../../lib/palettes'

export function SearchItem({
  type,
  thumbnail,
  title,
  subtitle,
  description,
  onPress,
}: {
  type: 'artist' | 'venue' | 'concert'
  thumbnail: ReactNode
  title: string
  subtitle: string
  description?: string
  onPress?: () => void
}) {
  return match(type)
    .with('artist', () => (
      <TouchableOpacity onPress={onPress} style={styles.itemWrapper}>
        {thumbnail}
        <View style={styles.itemInnerRight}>
          <Text weight="bold">{title}</Text>
          <Text weight="medium" style={{ color: palettes.gray['800'] }}>
            {subtitle}
          </Text>
        </View>
      </TouchableOpacity>
    ))
    .with('venue', () => {
      return (
        <TouchableOpacity onPress={onPress} style={styles.itemWrapper}>
          {thumbnail}
          <View style={styles.itemInnerRight}>
            <Text weight="bold">{title}</Text>
            <Text weight="medium" style={{ color: palettes.gray['800'] }}>
              {subtitle}
            </Text>
          </View>
        </TouchableOpacity>
      )
    })
    .with('concert', () => {
      return (
        <HorizontalConcertItem
          title={title}
          subtitle={subtitle}
          description={description ?? ''}
          thumbnailComponent={thumbnail}
          onPress={onPress}
        />
      )
    })
    .otherwise(() => null)
}

const styles = StyleSheet.create({
  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  itemInnerRight: {
    marginLeft: 8,
    flex: 1,
  },
})
