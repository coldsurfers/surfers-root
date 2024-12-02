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
        <TouchableOpacity onPress={onPress} style={styles.itemWrapper}>
          {thumbnail}
          <View style={styles.itemInnerRight}>
            <Text weight="bold">{title}</Text>
            <Text weight="medium" style={{ color: palettes.lightblue['500'] }}>
              {subtitle}
            </Text>
            <Text weight="medium" style={{ color: palettes.gray['800'] }}>
              {description}
            </Text>
          </View>
        </TouchableOpacity>
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
  },
})
